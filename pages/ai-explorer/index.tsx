import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import clsx from 'clsx'
import { Address, parseUnits } from 'viem'
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'

import AI_PAYMENT_ABI from '@abis/AiPayment.json'
import ERC20_ABI from '@abis/ERC20.json'
import { ApolloProvider } from '@apollo/client'
import ConversationComponent from '@components/AIExplorer/ConversationComponent'
import Sidebar from '@components/AIExplorer/Sidebar'
import { Button } from '@components/Button'
import { Container } from '@components/Home/Container'
import Layout from '@components/Layout/Layout'
import client from '@graphql/client/client'
import { useGetUsersAiBalance } from '@services/api'
import {
  useDeleteConversations,
  useGetUserChatHistory
} from '@services/api/chat'
import { useStore } from '@store/store'
import { Conversation } from '@type/internal/conversation'
import { formatCurrency } from '@utils/currency'
import { getRandomId } from '@utils/random'

const AI_PAYMENT_ADDRESS = process.env.NEXT_PUBLIC_AI_PAYMENT_ADDRESS as Address
const MLP_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MLP_TOKEN_ADDRESS as Address

const gradientBorderClass =
  'border-transparent [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] bg-[linear-gradient(to_right,white,white),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)] dark:bg-[linear-gradient(to_right,#151515,#151515),linear-gradient(to_bottom,rgba(231,137,255,1)_0%,rgba(146,153,255,1)_100%)]'

const AIExplorer = () => {
  const { address, isConnected } = useAccount()
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isSidebarOpen, onSidebarChange] = useState(false)
  const t = useTranslations('Ai')
  const [depositModalVisible, setDepositModalVisible] = useState(false)
  const [currentSelectedDepositAmount, setCurrentSelectedDepositAmount] =
    useState<'100' | '1000' | '10000'>('1000')
  const { data: userAiBalance, refetch: refetchUserAiBalance } =
    useGetUsersAiBalance(address)
  const [enableDeposit, setEnableDeposit] = useState(false)

  const { data: mlpTokenDecimals } = useReadContract({
    address: MLP_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'decimals',
    args: []
  })

  const {
    data: approveHash,
    writeContract: approveContract,
    isPending: isApprovingContract
  } = useWriteContract()

  const { data: approveData, isLoading: isWaitingApproveReceipt } =
    useWaitForTransactionReceipt({
      hash: approveHash,
      query: {
        enabled: approveHash !== undefined,
        initialData: undefined
      }
    })

  const {
    data: depositHash,
    writeContract: deposit,
    isPending: isDepositing
  } = useWriteContract()

  const { isLoading: isWaitingForDepositingReceipt, data: depositTransHash } =
    useWaitForTransactionReceipt({
      hash: depositHash,
      query: {
        enabled: depositHash !== undefined,
        initialData: undefined
      }
    })

  useEffect(() => {
    if (!isWaitingForDepositingReceipt && depositTransHash) {
      setDepositModalVisible(false)
      setTimeout(refetchUserAiBalance, 1000)
      setTimeout(refetchUserAiBalance, 3000)
    }
  }, [isWaitingForDepositingReceipt, depositTransHash, refetchUserAiBalance])

  const handleDeposit = useCallback(() => {
    if (!enableDeposit) {
      return
    }
    setEnableDeposit(false)
    deposit(
      {
        abi: AI_PAYMENT_ABI,
        functionName: 'makePayment',
        address: AI_PAYMENT_ADDRESS,
        args: [
          parseUnits(currentSelectedDepositAmount, mlpTokenDecimals as number)
        ]
      },
      {
        onError(err) {
          console.log(err.message)
          toast.error('Deposit Failed')
        }
      }
    )
  }, [currentSelectedDepositAmount, deposit, enableDeposit, mlpTokenDecimals])

  useEffect(() => {
    if (!isWaitingApproveReceipt && approveData) {
      handleDeposit()
    }
  }, [approveData, isWaitingApproveReceipt, handleDeposit])

  const handleDepositConfirm = () => {
    if (!address) {
      toast.info('Please connect your wallet first')
      return
    }

    const amount = parseUnits(
      currentSelectedDepositAmount,
      mlpTokenDecimals as number
    )

    approveContract({
      abi: ERC20_ABI,
      address: MLP_TOKEN_ADDRESS,
      functionName: 'approve',
      args: [AI_PAYMENT_ADDRESS, amount]
    })

    setEnableDeposit(true)
  }

  const {
    data: history,
    refetch,
    isFetched
  } = useGetUserChatHistory(address as string)
  const { mutateAsync: deleteConversations } = useDeleteConversations()

  const { conversations, setConversations } = useStore(
    ({ conversations, setConversations }) => ({
      conversations,
      setConversations
    })
  )

  useEffect(() => {
    return () => {
      setConversations([])
      setActiveConversationId('')
      refetch()
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setConversations(history)
  }, [history, setConversations])

  const createNewConversation = useCallback(() => {
    const conversation: Conversation = {
      id: getRandomId(),
      name: getRandomId(),
      messages: [],
      createdAt: new Date()
    }

    setConversations([...conversations, conversation])
    setActiveConversationId(conversation.id)
  }, [conversations, setConversations, setActiveConversationId])

  useEffect(() => {
    if (!address) {
      setActiveConversationId('')
    }
  }, [address])

  useEffect(() => {
    if (
      !address ||
      !isFetched ||
      (isFetched && history?.length && !conversations.length)
    )
      return

    const noConversations = conversations.length === 0

    if (noConversations) {
      createNewConversation()
    }

    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0]?.id || '')
    }
  }, [
    conversations,
    createNewConversation,
    setActiveConversationId,
    activeConversationId,
    address,
    isFetched,
    history
  ])

  const onDeleteConversation = async (conversationId: string) => {
    if (!isConnected) return

    try {
      await deleteConversations({
        user_id: address as string,
        conversation_ids: [conversationId]
      })
      if (conversationId === activeConversationId) {
        const remainingConversations = conversations.filter(
          (conv) => conv.id !== conversationId
        )
        if (remainingConversations.length > 0) {
          setActiveConversationId(remainingConversations[0]?.id || '')
        } else {
          setActiveConversationId('')
        }
      }
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  const handleDepositButtonClick = () => {
    setDepositModalVisible(true)
  }

  const calculateUsageCount = useMemo(() => {
    if (
      !userAiBalance?.totalNetworkUsageCount ||
      userAiBalance.totalNetworkUsageCount < 10
    ) {
      return Math.round(Math.random() * 350) + 50
    }

    return userAiBalance.totalNetworkUsageCount
  }, [userAiBalance?.totalNetworkUsageCount])

  const isConfirmButtonLoading =
    isApprovingContract ||
    isWaitingApproveReceipt ||
    isDepositing ||
    isWaitingForDepositingReceipt

  return (
    <Layout className='flex justify-center'>
      <Container
        className='w-[1440px] max-auto px-2 md:px-10 pt-[120px] pb-[140px] sm:pt-[160px]
          sm:pb-[100px] overflow-hidden'
      >
        <div
          className={clsx(
            `p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:px-8 md:py-4 border-2
              rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px]`,
            gradientBorderClass
          )}
        >
          <div
            className='bg-co-stake-box-bg dark:bg-black rounded-[16px] h-[55px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-between items-center'
          >
            <span className=''>{t('totalNetworkDeposits')}</span>
            <span>
              {formatCurrency(userAiBalance?.totalNetworkDeposit ?? 0)}
            </span>
          </div>
          <div
            className='bg-co-stake-box-bg dark:bg-black rounded-[16px] h-[55px] w-full px-4 text-[18px]
              text-co-gray-7 flex justify-between items-center'
          >
            <span className=''>{t('totalNetworkUsageCount')}</span>
            <span>{calculateUsageCount}</span>
          </div>
        </div>
        <div className='w-full h-[55vh] relative overflow-hidden rounded-[32px]'>
          <Sidebar
            activeConversationId={activeConversationId}
            createNewConversation={createNewConversation}
            setActiveConversationId={setActiveConversationId}
            onDeleteConversation={onDeleteConversation}
            isSidebarOpen={isSidebarOpen}
            onSidebarChange={onSidebarChange}
          />
          <ConversationComponent conversationId={activeConversationId} />
        </div>
        <div
          className={clsx(
            'p-4 mb-4 grid grid-cols-2 md:grid-cols-3 gap-4 md:px-8 md:py-4 border-2 my-4',
            'rounded-[20px] md:backdrop-filter md:backdrop-blur-[10px] border-[#666]'
          )}
        >
          <div
            className='bg-co-stake-box-bg dark:bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4
              text-[18px] text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>
              {t('totalDepositMLP')}
            </span>
            <span className='text-black dark:text-white text-[18px] font-[600]'>
              {formatCurrency(userAiBalance?.tokenAmount)}
            </span>
          </div>
          <div
            className='bg-co-stake-box-bg dark:bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4
              text-[18px] text-co-gray-7 flex justify-start items-center'
          >
            <span className='text-[14px] font-[600]'>{t('totalUsage')}</span>
            <span className='text-black dark:text-white text-[18px] font-[600]'>
              {userAiBalance?.totalUsage ?? 0}
            </span>
          </div>
          <div
            className='bg-co-stake-box-bg dark:bg-black flex-col gap-2 py-2 rounded-[16px] w-full px-4
              text-[18px] text-co-gray-7 flex justify-start items-center col-span-2
              md:col-span-1'
          >
            <span className='text-[14px] font-[600]'>
              {t('remainingUsage')}
            </span>
            <span className='text-black dark:text-white text-[18px] font-[600]'>
              {userAiBalance?.remainingTimes ?? 0}
            </span>
            <Button
              size='sm'
              className='w-full h-[32px] rounded-full'
              onClick={handleDepositButtonClick}
            >
              {t('deposit')}
            </Button>
          </div>
        </div>
      </Container>

      <Modal
        isOpen={depositModalVisible}
        onClose={() => setDepositModalVisible(false)}
        placement='center'
        size='lg'
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody className='pb-8'>
            <div className='text-center'>
              {t('enableYourAIInvestmentAdvisor')}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4'>
              <div
                onClick={() => setCurrentSelectedDepositAmount('100')}
                className={clsx(
                  'text-center border-2 rounded-[16px] p-4 cursor-pointer leading-[28px]',
                  currentSelectedDepositAmount === '100' && gradientBorderClass
                )}
              >
                {t('deposit')}
                <br />
                <span className='text-green-700'>100</span> MLP
                <br />
                {t('for')} <span className='text-green-700'>100</span>
                <br />
                {t('usage')}
              </div>

              <div
                onClick={() => setCurrentSelectedDepositAmount('1000')}
                className={clsx(
                  'text-center border-2 rounded-[16px] p-4 cursor-pointer leading-[28px]',
                  currentSelectedDepositAmount === '1000' && gradientBorderClass
                )}
              >
                {t('deposit')}
                <br />
                <span className='text-green-700'>1000</span> MLP
                <br />
                {t('for')} <span className='text-green-700'>1100</span>
                <br />
                {t('usage')}
              </div>

              <div
                onClick={() => setCurrentSelectedDepositAmount('10000')}
                className={clsx(
                  'text-center border-2 rounded-[16px] p-4 cursor-pointer leading-[28px]',
                  currentSelectedDepositAmount === '10000' &&
                    gradientBorderClass
                )}
              >
                {t('deposit')}
                <br />
                <span className='text-green-700'>10000</span> MLP
                <br />
                {t('for')} <span className='text-green-700'>12000</span>
                <br />
                {t('usage')}
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <Button
                isLoading={isConfirmButtonLoading}
                onClick={handleDepositConfirm}
                size='md'
                className='text-[16px] h-[36px]'
              >
                {t('confirm')}
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Layout>
  )
}

const AIExplorerPage = () => {
  return (
    <ApolloProvider client={client}>
      <AIExplorer />
    </ApolloProvider>
  )
}

export default AIExplorerPage
