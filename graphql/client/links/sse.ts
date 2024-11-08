import type { FetchResult, Operation } from '@apollo/client/core'
import { ApolloLink, Observable } from '@apollo/client/core'
import type { ExecutionResult } from 'graphql'
import { print } from 'graphql'
import type { Client, ClientOptions } from 'graphql-sse'
import { createClient } from 'graphql-sse'

export class SSELink extends ApolloLink {
  protected client: Client

  constructor(options: ClientOptions) {
    super()
    this.client = createClient(options)
  }

  public request(
    operation: Operation
  ): Observable<ExecutionResult<FetchResult>> {
    return new Observable<ExecutionResult<FetchResult>>((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: (result: ExecutionResult<FetchResult>) => sink.next(result),
          complete: () => sink.complete(),
          error: (error) => sink.error(error)
        }
      )
    })
  }
}
