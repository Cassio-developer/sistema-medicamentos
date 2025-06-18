import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/lib/validations/auth'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Dados inválidos',
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const isValidPassword = await compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    const token = sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 
    })

    
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 