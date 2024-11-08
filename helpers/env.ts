function assertEnvVariable(value: unknown, name: string) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${name} is required and must be a non-empty string.`)
  }
}

export const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
assertEnvVariable(CLERK_PUBLISHABLE_KEY, 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')

export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL!
assertEnvVariable(GRAPHQL_API_URL, 'NEXT_PUBLIC_GRAPHQL_API_URL')

export const WEB_APP_URL = process.env.NEXT_PUBLIC_WEB_APP_URL!
assertEnvVariable(WEB_APP_URL, 'NEXT_PUBLIC_WEB_APP_URL')
