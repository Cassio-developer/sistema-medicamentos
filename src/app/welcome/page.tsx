'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      title: "Bem-vindo ao Sistema de Gerenciamento de Medicamentos",
      description: "Uma solução completa para o controle e gestão de medicamentos",
      image: "/images/welcome-1.jpg"
    },
    {
      title: "Gestão Eficiente",
      description: "Controle seu estoque, monitore validades e gere relatórios detalhados",
      image: "/images/welcome-2.jpg"
    },
    {
      title: "Comece Agora",
      description: "Cadastre-se ou faça login para começar a usar o sistema",
      image: "/images/welcome-3.jpg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white">
    
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 mb-4">
            Sistema de Medicamentos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gerencie seus medicamentos de forma eficiente e segura
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto mb-16 rounded-xl overflow-hidden shadow-2xl"
        >
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/G4ExWMYt5vQ?autoplay=1&mute=1"
              title="Introdução ao Sistema"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </motion.div>

        
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                  style={{ width: "100%" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-8"
                  >
                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600">{slide.description}</p>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center space-x-4 mt-12"
        >
          <Link
            href="/auth/login"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/auth/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            Cadastrar
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 