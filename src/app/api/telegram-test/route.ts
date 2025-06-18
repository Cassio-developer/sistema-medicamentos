import { NextResponse } from 'next/server';
import { telegramService } from '@/services/telegram';

export async function GET() {
  try {
    const botLink = await telegramService.getBotInviteLink();

    const result = await telegramService.sendMessage(
      '<b>🔔 Teste do Sistema</b>\n\n' +
      'Esta é uma mensagem de teste do sistema de gerenciamento de medicamentos.'
    );

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
        setup: {
          message: 'Configure as variáveis de ambiente:',
          variables: {
            TELEGRAM_BOT_TOKEN: 'Token do seu bot (obtenha com @BotFather)',
            TELEGRAM_CHAT_ID: 'ID do chat ou grupo'
          },
          botLink: botLink || 'Bot não configurado'
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      result,
      setup: {
        botLink: botLink || 'Bot não configurado'
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      setup: {
        message: 'Erro na configuração do bot',
        help: 'Siga os passos abaixo:',
        steps: [
          '1. Abra o Telegram e procure por @BotFather',
          '2. Envie /newbot e siga as instruções',
          '3. Copie o token fornecido',
          '4. Configure TELEGRAM_BOT_TOKEN no .env.local',
          '5. Inicie uma conversa com o bot',
          '6. Use /start para obter o TELEGRAM_CHAT_ID'
        ]
      }
    });
  }
} 