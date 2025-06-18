interface TelegramConfig {
  botToken: string;
  chatId: string;
}

interface Report {
  total: number;
  expiring: Array<{
    nome: string;
    validade: string;
  }>;
  lowStock: Array<{
    nome: string;
    quantidade: number;
  }>;
  recent: Array<{
    nome: string;
  }>;
}

class TelegramService {
  private config: TelegramConfig;

  constructor() {
    this.config = {
      botToken: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || ''
    };
  }

  async sendMessage(message: string) {
    try {
      const url = `https://api.telegram.org/bot${this.config.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.config.chatId,
          text: message,
          parse_mode: 'HTML'
        }),
      });

      const data = await response.json();
      return {
        success: true,
        messageId: data.result?.message_id,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  async sendReport(report: Report) {
    const message = `
<b>📋 Relatório de Medicamentos</b>

📦 <b>Total de medicamentos:</b> ${report.total}

⚠️ <b>Medicamentos próximos do vencimento:</b>
${report.expiring.map(med => `• ${med.nome} (Vence: ${med.validade})`).join('\n')}

📉 <b>Estoque baixo:</b>
${report.lowStock.map(med => `• ${med.nome} (${med.quantidade} unidades)`).join('\n')}

✨ <b>Últimos cadastrados:</b>
${report.recent.map(med => `• ${med.nome}`).join('\n')}
    `;

    return this.sendMessage(message);
  }

  async getBotInviteLink() {
    try {
      const url = `https://api.telegram.org/bot${this.config.botToken}/getMe`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.ok && data.result?.username) {
        return `https://t.me/${data.result.username}`;
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter link do bot:', error);
      return null;
    }
  }
}

export const telegramService = new TelegramService(); 