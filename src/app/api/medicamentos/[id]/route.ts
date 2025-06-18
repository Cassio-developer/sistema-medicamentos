import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { unlink } from 'fs/promises'
import { join } from 'path'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const medicamento = await prisma.medicamento.findUnique({
      where: {
        id: parseInt(params.id),
      },
    })

    if (!medicamento) {
      return NextResponse.json(
        { error: 'Medicamento não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(medicamento)
  } catch (error) {
    console.error('Erro ao buscar medicamento:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar medicamento' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const medicamento = await prisma.medicamento.findUnique({
      where: {
        id: parseInt(params.id),
      },
    })

    if (!medicamento) {
      return NextResponse.json(
        { error: 'Medicamento não encontrado' },
        { status: 404 }
      )
    }

    if (medicamento.imagem) {
      try {
        const imagePath = join(process.cwd(), 'public/uploads', medicamento.imagem)
        await unlink(imagePath)
      } catch (error) {
        console.error('Erro ao deletar imagem:', error)
      }
    }

    await prisma.medicamento.delete({
      where: {
        id: parseInt(params.id),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar medicamento:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar medicamento' },
      { status: 500 }
    )
  }
} 