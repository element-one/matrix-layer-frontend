import { useCallback, useState } from 'react'

import {
  ObservableSubscription,
  OperationVariables,
  SubscriptionOptions,
  useApolloClient
} from '@apollo/client'

type UseLazySubscriptionReturn<TData, TVariables> = [
  (args: { variables: TVariables }) => void,
  {
    data?: TData
    preLoading: boolean
    loading: boolean
    complete: boolean
    error?: Error
    stopSubscription: () => void
  }
]

export function useLazySubscription<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData = any,
  TVariables extends OperationVariables = OperationVariables
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription: any,
  options?: SubscriptionOptions<TVariables>
): UseLazySubscriptionReturn<TData, TVariables> {
  const client = useApolloClient()

  const [preLoading, setPreLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<Error | undefined>()

  const [data, setData] = useState<TData | undefined>()
  const [subscriptionRef, setSubscriptionRef] =
    useState<ObservableSubscription | null>(null)

  const startSubscription = useCallback(
    ({ variables }: { variables: TVariables }) => {
      if (subscriptionRef) {
        subscriptionRef.unsubscribe()
      }

      setComplete(false)
      setPreLoading(true)
      setLoading(true)

      const observable = client.subscribe<TData, TVariables>({
        variables,
        ...(options ? options : {}),
        query: subscription
      })

      const subscriptionInstance = observable.subscribe({
        next: (result) => {
          setData(result.data as TData)
          setPreLoading(false)
        },
        complete: () => {
          setLoading(false)
          setPreLoading(false)
          setTimeout(() => {
            setComplete(true)
          }, 0)
        },
        error: (error) => {
          setError(error)
          setPreLoading(false)
          setLoading(false)
        }
      })

      setSubscriptionRef(subscriptionInstance)
    },
    [client, subscription, options, subscriptionRef]
  )

  const stopSubscription = useCallback(() => {
    if (subscriptionRef) {
      subscriptionRef.unsubscribe()
      setSubscriptionRef(null)
      setLoading(false)
      setPreLoading(false)
      setComplete(false)
    }
  }, [subscriptionRef])

  return [
    startSubscription,
    {
      data,
      preLoading,
      loading,
      complete,
      error,
      stopSubscription
    }
  ]
}
