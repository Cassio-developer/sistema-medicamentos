import { Twilio } from 'twilio'

if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error('TWILIO_ACCOUNT_SID não configurado')
}

if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('TWILIO_AUTH_TOKEN não configurado')
}

if (!process.env.TWILIO_PHONE_NUMBER) {
  throw new Error('TWILIO_PHONE_NUMBER não configurado')
}

if (!process.env.ADMIN_PHONE_NUMBER) {
  throw new Error('ADMIN_PHONE_NUMBER não configurado')
}

export const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const twilioConfig = {
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  adminPhoneNumber: process.env.ADMIN_PHONE_NUMBER
} 