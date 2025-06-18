'use client'

import { useState } from 'react'
import { FaWhatsapp, FaTimes, FaComments } from 'react-icons/fa'

interface Message {
  id: number
  text: string
  isBot: boolean
  action?: {
    type: 'whatsapp'
    phone: string
  }
}

const predefinedMessages: Message[] = [
  {
    id: 1,
    text: "Olá! Como posso ajudar você hoje?",
    isBot: true
  },
  {
    id: 2,
    text: "Escolha uma das opções abaixo:",
    isBot: true
  },
  {
    id: 3,
    text: "1. Informações sobre medicamentos",
    isBot: true
  },
  {
    id: 4,
    text: "2. Suporte técnico",
    isBot: true
  },
  {
    id: 5,
    text: "3. Falar com um atendente",
    isBot: true,
    action: {
      type: 'whatsapp',
      phone: '5511999999999' 
    }
  }
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      
      predefinedMessages.forEach((msg, index) => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg])
        }, index * 500)
      })
    }
  }

  const handleOptionClick = (option: number) => {
    if (selectedOption !== null) return 

    setSelectedOption(option)
    const userMessage: Message = {
      id: Date.now(),
      text: `Opção ${option}`,
      isBot: false
    }
    
    setMessages(prev => [...prev, userMessage])

    
    setTimeout(() => {
      let botResponse: Message
      switch (option) {
        case 1:
          botResponse = {
            id: Date.now() + 1,
            text: "Para informações sobre medicamentos, por favor acesse nossa página principal ou fale com um atendente.",
            isBot: true,
            action: {
              type: 'whatsapp',
              phone: '5511999999999' 
            }
          }
          break
        case 2:
          botResponse = {
            id: Date.now() + 1,
            text: "Para suporte técnico, entre em contato pelo WhatsApp.",
            isBot: true,
            action: {
              type: 'whatsapp',
              phone: '5511999999999' 
            }
          }
          break
        case 3:
          botResponse = {
            id: Date.now() + 1,
            text: "Redirecionando para o WhatsApp...",
            isBot: true,
            action: {
              type: 'whatsapp',
              phone: '5511999999999'
            }
          }
          break
        default:
          botResponse = {
            id: Date.now() + 1,
            text: "Opção inválida. Por favor, escolha uma das opções disponíveis.",
            isBot: true
          }
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  const handleWhatsAppRedirect = (phone: string) => {
    const message = encodeURIComponent("Olá! Preciso de ajuda com o sistema de medicamentos.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <FaComments className="w-6 h-6" />
        </button>
      )}

      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 max-h-[500px] flex flex-col">
        
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Assistente Virtual</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.isBot
                      ? 'bg-gray-100'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.action?.type === 'whatsapp' && (
                    <button
                      onClick={() => handleWhatsAppRedirect(message.action!.phone)}
                      className="flex items-center space-x-2 mt-2 text-green-500 hover:text-green-600"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      <span className="text-xs">Continuar no WhatsApp</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          {selectedOption === null && (
            <div className="p-4 border-t space-y-2">
              {[1, 2, 3].map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left p-2 text-sm rounded hover:bg-gray-100 transition-colors"
                >
                  {option}. {option === 1 ? 'Informações sobre medicamentos' :
                    option === 2 ? 'Suporte técnico' : 'Falar com um atendente'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 