import { NextResponse } from 'next/server'
import { Twilio } from 'twilio'

export async function GET() {
  try {
    const config = {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
      adminPhone: process.env.ADMIN_PHONE_NUMBER
    }

    const missingVars = Object.entries(config)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Variáveis de ambiente faltando',
        missingVars
      }, { status: 400 })
    }

    const client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    )

    const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID!).fetch()

    return NextResponse.json({
      success: true,
      message: 'Configuração do Twilio está correta',
      accountStatus: account.status,
      config: {
        accountSid: `${config.accountSid?.substring(0, 5)}...`,
        phoneNumber: config.phoneNumber,
        adminPhone: config.adminPhone
      }
    })
  } catch (error: any) {
    console.error('Erro ao testar configuração do Twilio:', error)
    return NextResponse.json({
      success: false,
      message: 'Erro ao validar configuração do Twilio',
      error: error.message,
      code: error.code,
      moreInfo: error.moreInfo
    }, { status: 500 })
  }
} 