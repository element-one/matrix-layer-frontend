import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Address } from 'viem'

// import axios from '../axios/client'

export interface ApiGetCompensateListResponse {
  list: Address[]
}

// TODO need api
export const getCompensateList = async () => {
  //   const url = ''
  //   const { data } = await axios.get<ApiGetCompensateListResponse>(url)
  const data = {
    list: [
      '0x39A3cc8Da350b3c6B436Cb47FeAEE8aae54ACD28',
      '0x1B1d9Cb1Ca240F7dD9359c33376c42f4c220C31c',
      '0xe273f8beEb0ca112292c4aC407c35EE604E54cD2',
      '0x4f3dEbae8B204DF67e4f6F1635DEB9731bBfE9e1',
      '0xa9f1Cd6a9d1D7C27b6b6e9F2399C5E3636F0479B',
      '0x8ea0e16dc6A0616B1A69B60C2dF8B5f39CAcD267'
    ]
  }

  return data as ApiGetCompensateListResponse
}

export const useGetCompensateList = (
  options?: Partial<UseQueryOptions<ApiGetCompensateListResponse, any, any>>
) => {
  return useQuery<ApiGetCompensateListResponse>({
    queryKey: ['get', 'compensate'],
    queryFn: () => getCompensateList(),
    ...options
  })
}
