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

  if (request.nextUrl.pathname.startsWith('/chat')) {
    console.log('rewriting to chat api')
    const chatApiUrl = process.env.NEXT_PUBLIC_CHAT_WEB_APP_URL
    console.log('chatApiUrl', chatApiUrl, request.url)
    if (!chatApiUrl)
      throw new Error('NEXT_PUBLIC_CHAT_WEB_APP_URL is not defined')

    const fullPath = request.nextUrl.pathname.replace('/chat', '')
    return NextResponse.rewrite(new URL(fullPath, chatApiUrl))
  }
}

export const config = {
  matcher: ['/graphql/:path*', '/chat/:path*']
}
