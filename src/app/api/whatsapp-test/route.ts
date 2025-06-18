import { NextResponse } from 'next/server';
import { whatsappService } from '@/services/whatsapp';

export async function GET() {
  try {
    const toNumber = process.env.ADMIN_PHONE_NUMBER;

    if (!toNumber) {
      return NextResponse.json({
        success: false,
        message: 'Número de telefone do administrador não configurado (ADMIN_PHONE_NUMBER)'
      });
    }

    console.log('Enviando mensagem de teste para:', toNumber);

    const result = await whatsappService.sendMessage(
      toNumber,
      '🔔 *Teste de Mensagem*\n\nEsta é uma mensagem de teste do sistema de gerenciamento de medicamentos.'
    );

    console.log('Resultado do envio:', result);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: 'Erro ao enviar mensagem',
        error: result.error,
        details: result
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      result
    });

  } catch (error: any) {
    console.error('Erro completo:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro ao enviar mensagem',
      error: error.message,
      stack: error.stack
    });
  }
} 