import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Não autorizado' },
        { status: 401 }
      )
    }

    const decoded = verify(token.value, JWT_SECRET) as {
      id: string
      email: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user
    })
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 