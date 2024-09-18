import { useCallback } from 'react'
import { useDisconnect as useWagmiDisconnect, useSignMessage } from 'wagmi'

import { useAuth } from '@contexts/auth'
import { usePostLogout } from '@services/api/auth'
import { useStore } from '@store/store'

export const useDisconnect = () => {
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect()
  const { reset } = useSignMessage()
  const { setHasSignSuccess } = useStore(state => ({
    setHasSignSuccess: state.setHasSignSuccess
  }))
  const { setAuthenticated } = useAuth()
  const { mutate: logout } = usePostLogout()

  const disconnect = useCallback(() => {
    wagmiDisconnect(undefined, {
      onSuccess() {
        reset()
        setAuthenticated(false)
        setHasSignSuccess(false)

        try {
          logout()
        } catch (error) {
          console.log('connect wallet button logout error:', error)
        }
      }
    })
  }, [logout, reset, setHasSignSuccess, setAuthenticated, wagmiDisconnect])

  return {
    disconnect
  }
}