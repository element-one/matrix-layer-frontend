import { ApolloClient, InMemoryCache } from '@apollo/client'

import { link } from './links/link'

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export default client
