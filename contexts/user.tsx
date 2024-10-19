import React, {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useAccount } from 'wagmi'

import { useGetUser } from '@services/api/user'
import { ApiUser } from '@type/api'

export interface UserContextProps {
  user: ApiUser | undefined
  isLoggedIn: boolean
  isLoading: boolean
  setLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: ApiUser | undefined) => void
}

const defaultContext: UserContextProps = {
  user: undefined,
  isLoggedIn: false,
  isLoading: true,
  setLoggedIn: () => null,
  setUser: () => null
}

export const UserContext = createContext<UserContextProps>(defaultContext)

export const UserProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {
  const { address } = useAccount()

  const [user, setUser] = useState<ApiUser | undefined>(defaultContext.user)

  const { data: fetchedUser } = useGetUser(address, { enabled: !!address })

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedUser])

  return (
    <UserContext.Provider
      value={{
        ...defaultContext,
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
