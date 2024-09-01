import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })
  console.log("user", user)
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/users') && (!user || user.role !== 3)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
