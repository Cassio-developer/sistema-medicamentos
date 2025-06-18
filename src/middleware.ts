import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Rotas que não precisam de autenticação
const publicRoutes = ['/auth/login', '/auth/register', '/welcome']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')

  // Se não tiver token e não for rota pública, redireciona para welcome
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/welcome', request.url))
  }

  // Se tiver token e for rota pública, verifica se é válido
  if (token && publicRoutes.includes(pathname)) {
    try {
      verify(token.value, JWT_SECRET)
      // Se for válido, redireciona para home
      return NextResponse.redirect(new URL('/', request.url))
    } catch {
      // Se for inválido, remove o token
      request.cookies.delete('auth-token')
    }
  }

  // Em todos os outros casos, permite o acesso
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - uploads (arquivos de upload)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|uploads).*)'
  ]
} 