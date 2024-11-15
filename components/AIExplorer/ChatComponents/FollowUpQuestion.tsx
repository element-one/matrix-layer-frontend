import { useTranslations } from 'next-intl'

import { MessageIcon } from '@components/Icon/Message'
import { Text } from '@components/Text'
import { ChatFollowUpOptionInput } from '@type/graphqlApiSchema'

interface FollowUpQuestionProps {
  followUpQuestions: ChatFollowUpOptionInput[]
  followUpQuestionsIndex: number
  onSelect: (index: number) => void
}

const FollowUpQuestion = ({
  followUpQuestions,
  onSelect
}: FollowUpQuestionProps) => {
  const t = useTranslations('Ai.conversation')
  return (
    <div className='flex flex-col mx-10 mt-4 gap-2'>
      <Text className='text-[14px]'>{t('followUp')}</Text>
      <div className='flex flex-col gap-y-3'>
        {followUpQuestions.map((followUpQuestion, index) => {
          return (
            <div key={index} onClick={() => onSelect(index)}>
              <div className='flex items-center gap-x-2'>
                <MessageIcon className='shrink-0' />
                <Text className='text-blue-500 underline cursor-pointer'>
                  {followUpQuestion.displayed_value}
                </Text>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FollowUpQuestion
