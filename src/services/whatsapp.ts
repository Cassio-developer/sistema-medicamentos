import { create, Whatsapp } from '@wppconnect-team/wppconnect';

interface WhatsAppMessage {
  to: string;
  message: string;
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

class WhatsAppService {
  private client: Whatsapp | null = null;

  async initialize() {
    try {
      this.client = await create({
        session: 'medication-system',
        catchQR: (base64Qr) => {
          // Aqui você pode salvar o QR code ou enviar para uma rota específica
          console.log('QR Code gerado:', base64Qr);
        },
        statusFind: (statusSession) => {
          console.log('Status:', statusSession);
        },
      });

      console.log('WhatsApp conectado com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar WhatsApp:', error);
      return false;
    }
  }

  private getBaseUrl() {
    // Verifica se está em desenvolvimento ou produção
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    return baseUrl;
  }

  async sendMessage(to: string, message: string) {
    try {
      const baseUrl = this.getBaseUrl();
      const response = await fetch(`${baseUrl}/api/whatsapp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: to,
          message: message,
        } as WhatsAppMessage),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }

      return result;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  async sendReport(to: string, report: Report) {
    const message = `📋 *Relatório de Medicamentos*\n\n` +
      `📦 Total de medicamentos: ${report.total}\n\n` +
      `⚠️ *Medicamentos próximos do vencimento:*\n${report.expiring.map(
        med => `- ${med.nome} (Vence: ${med.validade})`
      ).join('\n')}\n\n` +
      `📉 *Estoque baixo:*\n${report.lowStock.map(
        med => `- ${med.nome} (${med.quantidade} unidades)`
      ).join('\n')}\n\n` +
      `✨ *Últimos cadastrados:*\n${report.recent.map(
        med => `- ${med.nome}`
      ).join('\n')}`;

    return this.sendMessage(to, message);
  }
}

export const whatsappService = new WhatsAppService(); 