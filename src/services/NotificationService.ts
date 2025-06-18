import { prisma } from '@/lib/prisma'
import { Twilio } from 'twilio'

if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error('TWILIO_ACCOUNT_SID não está configurado no .env')
}

if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('TWILIO_AUTH_TOKEN não está configurado no .env')
}

if (!process.env.TWILIO_PHONE_NUMBER) {
  throw new Error('TWILIO_PHONE_NUMBER não está configurado no .env')
}

if (!process.env.ADMIN_PHONE_NUMBER) {
  throw new Error('ADMIN_PHONE_NUMBER não está configurado no .env')
}

function formatWhatsAppNumber(number: string) {
  const cleaned = number.replace(/\D/g, '')
  
  return cleaned.startsWith('+') ? cleaned : `+${cleaned}`
}

const twilioNumber = formatWhatsAppNumber(process.env.TWILIO_PHONE_NUMBER)
const adminNumber = formatWhatsAppNumber(process.env.ADMIN_PHONE_NUMBER)

console.log('Configurações do Twilio:', {
  accountSid: `${process.env.TWILIO_ACCOUNT_SID?.substring(0, 5)}...`,
  phoneNumber: twilioNumber,
  adminPhone: adminNumber
})

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export class NotificationService {
  static sendWhatsAppReport() {
    throw new Error('Method not implemented.')
  }
  static async enviarRelatorioProdutos() {
    try {
      console.log('Iniciando geração do relatório...')
      
      
      const medicamentos = await prisma.medicamento.findMany({
        orderBy: {
          validade: 'asc'
        }
      })

      console.log(`Total de medicamentos encontrados: ${medicamentos.length}`)

      let mensagem = '🏥 *Relatório de Medicamentos*\n\n'

      mensagem += `📊 Total de Medicamentos: ${medicamentos.length}\n\n`

      const hoje = new Date()
      const trintaDiasFrente = new Date(hoje.setDate(hoje.getDate() + 30))
      
      const medicamentosVencendo = medicamentos.filter(
        med => new Date(med.validade) <= trintaDiasFrente
      )

      if (medicamentosVencendo.length > 0) {
        mensagem += '⚠️ *Medicamentos próximos do vencimento:*\n'
        medicamentosVencendo.forEach(med => {
          mensagem += `- ${med.nome} (${med.fabricante}) - Vence em: ${new Date(med.validade).toLocaleDateString('pt-BR')}\n`
        })
        mensagem += '\n'
      }

      const estoqueBaixo = medicamentos.filter(med => med.quantidade < 5)
      
      if (estoqueBaixo.length > 0) {
        mensagem += '📉 *Medicamentos com estoque baixo:*\n'
        estoqueBaixo.forEach(med => {
          mensagem += `- ${med.nome} (${med.quantidade} unidades)\n`
        })
        mensagem += '\n'
      }

      const ultimosCadastrados = medicamentos
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5)

      if (ultimosCadastrados.length > 0) {
        mensagem += '🆕 *Últimos medicamentos cadastrados:*\n'
        ultimosCadastrados.forEach(med => {
          mensagem += `- ${med.nome} (${med.fabricante})\n`
        })
      }

      console.log('Mensagem gerada:', mensagem)
      console.log('Tentando enviar mensagem via Twilio...')

      const messageParams = {
        body: mensagem,
        from: `whatsapp:${twilioNumber}`,
        to: `whatsapp:${adminNumber}`
      }

      console.log('Parâmetros da mensagem:', {
        ...messageParams,
        body: 'conteúdo omitido para log'
      })

      const result = await twilioClient.messages.create(messageParams)

      console.log('Resposta do Twilio:', {
        sid: result.sid,
        status: result.status,
        errorCode: result.errorCode,
        errorMessage: result.errorMessage
      })

      return { 
        success: true, 
        message: 'Relatório enviado com sucesso',
        messageId: result.sid
      }
    } catch (error: any) {
      console.error('Erro detalhado ao enviar relatório:', {
        message: error.message,
        code: error.code,
        moreInfo: error.moreInfo,
        status: error.status
      })
      
      throw new Error(`Falha ao enviar relatório: ${error.message}`)
    }
  }
} 