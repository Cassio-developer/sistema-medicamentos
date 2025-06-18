import { NextResponse } from 'next/server'
import { NotificationService } from '@/services/NotificationService'

export async function POST() {
  try {
    console.log('Iniciando envio do relatório via API...')
    const resultado = await NotificationService.enviarRelatorioProdutos()
    console.log('Relatório enviado com sucesso:', resultado)
    return NextResponse.json(resultado)
  } catch (error: any) {
    console.error('Erro detalhado na API:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao enviar relatório',
        error: error.message
      },
      { status: 500 }
    )
  }
} 