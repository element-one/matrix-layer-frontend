import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/graphql')) {
    console.log('rewriting to graphql api')
    const graphqlApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
    if (!graphqlApiUrl)
      throw new Error('NEXT_PUBLIC_GRAPHQL_API_URL is not defined')

    return NextResponse.rewrite(new URL(graphqlApiUrl))
  }
}

export const config = {
  matcher: ['/graphql/:path*']
}
