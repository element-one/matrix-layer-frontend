import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { useRouter } from 'next/router'

import { useGetAuth } from '@services/api/auth'
import { useGetMe } from '@services/api/user'
import { ApiUser } from '@type/api'

export interface AuthContextProps {
  user: ApiUser | undefined
  isAuthenticated: boolean
  isLoading: boolean
  setAuthenticated: (isAuthenticated: boolean) => void
  setAuthUser: (user: ApiUser | undefined) => void
}

const defaultContext: AuthContextProps = {
  user: undefined,
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: () => null,
  setAuthUser: () => null
}

export const AuthContext = createContext<AuthContextProps>(defaultContext)

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultContext.isAuthenticated
  )
  const [user, setUser] = useState<ApiUser | undefined>(defaultContext.user)
  const [isLoading, setLoading] = useState(defaultContext.isLoading)

  const setAuthenticated = useCallback(
    (isAuthenticated: boolean) => setIsAuthenticated(isAuthenticated),
    [setIsAuthenticated]
  )

  const setAuthUser = useCallback(
    (authUser: ApiUser | undefined) => setUser(authUser),
    [setUser]
  )

  const { data: authStatus, isPending: isFetchingAuthStatus } = useGetAuth()
  const { data: authUser } = useGetMe({ enabled: isAuthenticated })

  useEffect(() => {
    authStatus && setAuthenticated(!!authStatus)
  }, [authStatus, setAuthenticated])

  useEffect(() => {
    authUser && setAuthUser(authUser)
  }, [authUser, setAuthUser])

  useEffect(() => {
    setLoading(isFetchingAuthStatus)
  }, [isFetchingAuthStatus])

  return (
    <AuthContext.Provider
      value={{
        ...defaultContext,
        isLoading,
        isAuthenticated,
        user,
        setAuthenticated,
        setAuthUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

type RouteGuardFunction = (Component: React.FC) => React.FC | JSX.Element

export const AuthGuard: RouteGuardFunction = (Component) => {
  const Authenticated: React.FC = (): JSX.Element | null => {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated && !isLoading) router.push('/')
    }, [isAuthenticated, isLoading, router])

    return isAuthenticated ? <Component /> : null
  }

  return Authenticated
}
