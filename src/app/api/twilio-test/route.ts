import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function GET() {
  try {
    // Criando o cliente Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const diagnostico = {
      accountSidPresente: !!accountSid,
      accountSidFormato: accountSid?.startsWith('AC'),
      accountSidTamanho: accountSid?.length,
      authTokenPresente: !!authToken,
      authTokenTamanho: authToken?.length,
    };

    if (!accountSid || !authToken) {
      return NextResponse.json({
        success: false,
        message: 'Variáveis de ambiente incompletas',
        diagnostico
      });
    }

    if (!accountSid.startsWith('AC')) {
      return NextResponse.json({
        success: false,
        message: 'Account SID inválido - deve começar com AC',
        diagnostico
      });
    }

    const client = twilio(accountSid, authToken);

    const account = await client.api.accounts(accountSid).fetch();

    return NextResponse.json({
      success: true,
      message: 'Configuração do Twilio válida',
      accountStatus: account.status,
      accountType: account.type,
      diagnostico
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao validar configuração do Twilio',
      error: error.message,
      codigo: error.code,
      diagnostico: {
        accountSidPresente: !!process.env.TWILIO_ACCOUNT_SID,
        accountSidFormato: process.env.TWILIO_ACCOUNT_SID?.startsWith('AC'),
        accountSidTamanho: process.env.TWILIO_ACCOUNT_SID?.length,
        authTokenPresente: !!process.env.TWILIO_AUTH_TOKEN,
        authTokenTamanho: process.env.TWILIO_AUTH_TOKEN?.length,
      }
    });
  }
} 