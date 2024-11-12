import { ApolloLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { LANG_SERVER_URL_PARAM_NAME } from '@constants/graphql'
import { getSyncStorageItems } from '@helpers/chrome'

export const createCustomChatFlowHeaders = async (
  headers?: Record<string, string>
) => {
  const storageResult = await getSyncStorageItems([LANG_SERVER_URL_PARAM_NAME])
  const langServeUrl = storageResult[LANG_SERVER_URL_PARAM_NAME]

  return {
    ...headers,
    ...(langServeUrl ? { [LANG_SERVER_URL_PARAM_NAME]: langServeUrl } : {})
  }
}

const createCustomChatFlowLink = (link: ApolloLink): ApolloLink => {
  const authLink = setContext(async (_, { headers }) => {
    const mergedHeaders = await createCustomChatFlowHeaders(headers)
    return { headers: mergedHeaders }
  })

  return from([authLink, link])
}

export default createCustomChatFlowLink
