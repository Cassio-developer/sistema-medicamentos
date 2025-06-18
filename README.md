# Sistema de Medicamentos

Um sistema completo para gerenciamento de medicamentos desenvolvido com Next.js, TypeScript, Prisma e Tailwind CSS.

## 🚀 Funcionalidades

- **Autenticação de Usuários**: Sistema de login e registro
- **Gerenciamento de Medicamentos**: CRUD completo para medicamentos
- **Upload de Imagens**: Suporte para upload de imagens de medicamentos
- **Notificações**: Integração com WhatsApp, Telegram e Twilio
- **Relatórios**: Geração de relatórios de medicamentos
- **Interface Responsiva**: Design moderno e responsivo com Tailwind CSS
- **ChatBot**: Assistente virtual integrado

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Banco de Dados**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **Autenticação**: Sistema customizado com sessões
- **Upload**: Multer para upload de arquivos
- **Notificações**: WhatsApp Business API, Telegram Bot API, Twilio

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd projeto-sistema-mediamentos
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:
```env
# Banco de dados (desenvolvimento local)
DATABASE_URL="file:./dev.db"

# Chaves de API (opcional - para notificações)
TWILIO_ACCOUNT_SID=sua_twilio_account_sid
TWILIO_AUTH_TOKEN=sua_twilio_auth_token
TWILIO_PHONE_NUMBER=seu_numero_twilio

TELEGRAM_BOT_TOKEN=seu_telegram_bot_token
TELEGRAM_CHAT_ID=seu_chat_id

# WhatsApp Business API (se configurado)
WHATSAPP_TOKEN=seu_whatsapp_token
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
```

4. **Configure o banco de dados**
```bash
npx prisma generate
npx prisma db push
```

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🚀 Deploy no Vercel

### 1. Configuração do Banco de Dados

Para deploy no Vercel, você precisa de um banco PostgreSQL. Recomendamos:

- **Vercel Postgres** (mais fácil)
- **Neon** (gratuito)
- **Supabase** (gratuito)

### 2. Configuração do Schema

1. **Substitua o conteúdo do arquivo `prisma/schema.prisma`** pelo conteúdo de `prisma/schema.production.prisma`
2. **Ou edite manualmente** o `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Deploy no Vercel

1. **Conecte seu repositório** ao Vercel
2. **Configure as variáveis de ambiente**:
   - `DATABASE_URL`: URL do seu banco PostgreSQL
   - Outras variáveis de API (opcional)

3. **Configure o Build Command** (se necessário):
```bash
npx prisma generate && npm run build
```

4. **Configure o Install Command**:
```bash
npm install
```

### 4. Pós-deploy

Após o deploy, execute as migrações:
```bash
npx prisma db push
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Rotas de autenticação
│   │   ├── medicamentos/  # CRUD de medicamentos
│   │   ├── notifications/ # Notificações
│   │   └── upload/        # Upload de arquivos
│   ├── components/        # Componentes React
│   ├── contexts/          # Contextos React
│   └── services/          # Serviços externos
├── lib/                   # Utilitários e configurações
├── types/                 # Tipos TypeScript
└── middleware.ts          # Middleware de autenticação
```

## 🔐 Autenticação

O sistema utiliza um sistema de autenticação customizado com sessões armazenadas em cookies. Os usuários podem:

- Registrar uma nova conta
- Fazer login com email e senha
- Fazer logout
- Atualizar perfil com foto

## 💊 Gerenciamento de Medicamentos

Funcionalidades disponíveis:

- **Criar**: Adicionar novos medicamentos com imagem
- **Visualizar**: Listar todos os medicamentos
- **Editar**: Modificar informações dos medicamentos
- **Excluir**: Remover medicamentos
- **Buscar**: Filtrar medicamentos por nome

## 📱 Notificações

O sistema suporta múltiplos canais de notificação:

- **WhatsApp**: Envio de mensagens via WhatsApp Business API
- **Telegram**: Notificações via bot do Telegram
- **SMS**: Envio de SMS via Twilio

## 📊 Relatórios

Geração de relatórios em PDF com informações dos medicamentos cadastrados.

## 🤖 ChatBot

Assistente virtual integrado para ajudar usuários com dúvidas sobre o sistema.

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Configure o banco PostgreSQL
4. Deploy automático a cada push

### Outras plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter um pull request.

## 📞 Suporte

Para suporte, entre em contato através das issues do GitHub ou email.

---

Desenvolvido com ❤️ usando Next.js
