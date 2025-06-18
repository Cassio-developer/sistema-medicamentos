import { NextResponse } from 'next/server';
import { create, Whatsapp, CreateOptions } from '@wppconnect-team/wppconnect';

let whatsappClient: Whatsapp | null = null;

async function initializeWhatsApp() {
  if (whatsappClient) return whatsappClient;

  try {
    console.log('Iniciando cliente WhatsApp...');
    
    const options: CreateOptions = {
      puppeteerOptions: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=site-per-process',
          '--ignore-certificate-errors',
          '--ignore-certificate-errors-spki-list'
        ],
        executablePath: process.env.CHROME_PATH,
        defaultViewport: null,
        handleSIGINT: false,
        handleSIGTERM: false,
        handleSIGHUP: false,
        timeout: 0
      },
      autoClose: 0,
      createPathFileToken: true,
      disableWelcome: true,
      updatesLog: true,
      tokenStore: 'file',
      folderNameToken: './tokens',
      sessionToken: {
        WABrowserId: 'Chrome',
        WASecretBundle: '',
        WAToken1: '',
        WAToken2: '',
      },
      catchQR: (base64Qr, asciiQR, attempt) => {
        console.log('\n\n==================================');
        console.log('ESCANEIE O QR CODE ABAIXO NO SEU WHATSAPP:');
        console.log('==================================\n\n');
        console.log(base64Qr);
        console.log('\nTentativa:', attempt);
      },
      statusFind: (statusSession, session) => {
        console.log('Status da sessão:', statusSession);
        if (statusSession === 'inChat' || statusSession === 'qrReadSuccess') {
          console.log('WhatsApp conectado com sucesso!');
        }
      }
    };

    whatsappClient = await create({
      session: 'medication-system',
      ...options
    });

    console.log('Cliente WhatsApp criado com sucesso!');

    // Adiciona handler para desconexão
    whatsappClient.onStateChange((state) => {
      console.log('Estado do WhatsApp:', state);
      if (typeof state === 'string' && state.includes('DISCONNECTED')) {
        console.log('WhatsApp desconectado, limpando cliente...');
        whatsappClient = null;
      }
    });

    return whatsappClient;
  } catch (error) {
    console.error('Erro ao inicializar WhatsApp:', error);
    whatsappClient = null;
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { to, message } = await request.json();

    if (!to || !message) {
      return NextResponse.json({
        success: false,
        error: 'Número de telefone e mensagem são obrigatórios'
      }, { status: 400 });
    }

    console.log('Tentando inicializar cliente WhatsApp...');
    const whatsapp = await initializeWhatsApp();

    if (!whatsapp) {
      console.error('Falha ao inicializar cliente WhatsApp');
      return NextResponse.json({
        success: false,
        error: 'Não foi possível inicializar o cliente WhatsApp'
      }, { status: 500 });
    }

    const formattedNumber = to.replace(/\D/g, '');
    const whatsappNumber = `${formattedNumber}@c.us`;

    console.log('Verificando número:', whatsappNumber);
    try {
      const isRegistered = await whatsapp.checkNumberStatus(whatsappNumber);
      
      if (!isRegistered.numberExists) {
        console.warn('Número não registrado no WhatsApp:', whatsappNumber);
        return NextResponse.json({
          success: false,
          error: 'Número não registrado no WhatsApp'
        }, { status: 400 });
      }
    } catch (checkError) {
      console.warn('Erro ao verificar número, tentando enviar mesmo assim:', checkError);
    }

    console.log('Enviando mensagem para:', whatsappNumber);
    
    const result = await whatsapp.sendText(whatsappNumber, message);

    console.log('Mensagem enviada com sucesso:', result);
    return NextResponse.json({
      success: true,
      messageId: result.id,
      timestamp: result.timestamp,
      status: result.ack
    });

  } catch (error: any) {
    console.error('Erro detalhado:', error);
    
    if (error.message?.includes('Session') || 
        error.message?.includes('auth') || 
        error.message?.includes('Protocol')) {
      console.log('Erro de sessão detectado, limpando cliente...');
      whatsappClient = null;
    }

    return NextResponse.json({
      success: false,
      error: error.message || 'Erro ao enviar mensagem',
      stack: error.stack
    }, { status: 500 });
  }
} 