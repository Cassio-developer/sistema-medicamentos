import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const medicamentos = await prisma.medicamento.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(medicamentos)
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar medicamentos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const medicamento = await prisma.medicamento.create({
      data: {
        ...data,
        validade: new Date(data.validade),
      },
    })
    return NextResponse.json(medicamento)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar medicamento' },
      { status: 500 }
    )
  }
} 