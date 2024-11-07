import { gql } from '@apollo/client'

export const agentQuery = gql`
  query agent($id: String!) {
    agent(id: $id) {
      status
    }
  }
`
