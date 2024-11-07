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

export const BUILD_EXTENSION_VERSION =
  process.env.NEXT_PUBLIC_BUILD_EXTENSION_VERSION
assertEnvVariable(
  BUILD_EXTENSION_VERSION,
  'NEXT_PUBLIC_BUILD_EXTENSION_VERSION'
)

export const BUILD_COMMIT_HASH = process.env.NEXT_PUBLIC_BUILD_COMMIT_HASH
assertEnvVariable(BUILD_COMMIT_HASH, 'NEXT_PUBLIC_BUILD_COMMIT_HASH')

export const BUILD_DATE = process.env.NEXT_PUBLIC_BUILD_DATE!
assertEnvVariable(BUILD_DATE, 'NEXT_PUBLIC_BUILD_DATE')

export const BUILD_NODE_VERSION = process.env.NEXT_PUBLIC_BUILD_NODE_VERSION
assertEnvVariable(BUILD_NODE_VERSION, 'NEXT_PUBLIC_BUILD_NODE_VERSION')

export const BUILD_OS_INFO = process.env.NEXT_PUBLIC_BUILD_OS_INFO
assertEnvVariable(BUILD_OS_INFO, 'NEXT_PUBLIC_BUILD_OS_INFO')
