import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validação do input
    const result = registerSchema.safeParse(body)
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

    const { name, email, password, role, image } = result.data

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email já está em uso' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10)

    // Cria o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase() as 'ADMIN' | 'COLLABORATOR',
        image: image || 'no-image.png' // Inclui a imagem se fornecida
      }
    })

    // Remove a senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: 'Usuário registrado com sucesso',
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 