import { NextResponse } from 'next/server'
import { NotificationService } from '@/services/NotificationService'

export async function POST() {
  try {
    await NotificationService.sendWhatsAppReport()
    return NextResponse.json({ success: true, message: 'Relatório enviado com sucesso' })
  } catch (error) {
    console.error('Erro ao enviar relatório:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar relatório' },
      { status: 500 }
    )
  }
} 