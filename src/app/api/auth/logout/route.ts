import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    cookies().delete('auth-token')

    return NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao fazer logout' },
      { status: 500 }
    )
  }
} 