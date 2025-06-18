import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gera um nome único para o arquivo
    const fileName = `${Date.now()}-${file.name}`
    const path = join(process.cwd(), 'public/uploads', fileName)

    // Salva o arquivo
    await writeFile(path, buffer)

    // Retorna a URL do arquivo
    return NextResponse.json({ url: `/uploads/${fileName}` })
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload do arquivo' },
      { status: 500 }
    )
  }
} 