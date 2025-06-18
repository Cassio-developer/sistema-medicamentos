import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhuma imagem foi enviada' },
        { status: 400 }
      )
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'O arquivo deve ser uma imagem' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `user-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`
    const path = join(process.cwd(), 'public/uploads', fileName)

    await writeFile(path, buffer)

    return NextResponse.json({ fileName })
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    )
  }
} 