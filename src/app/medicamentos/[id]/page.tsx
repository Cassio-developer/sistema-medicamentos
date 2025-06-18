'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaPills, FaIndustry, FaCalendarAlt, FaBoxes, FaClinicMedical } from 'react-icons/fa'
import Link from 'next/link'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Medicamento {
  id: number
  nome: string
  fabricante: string
  descricao: string
  dosagem: string
  tipo: string
  quantidade: number
  validade: string
  createdAt: string
  updatedAt: string
}

const getCarouselSlides = (tipo: string) => {
  const slides = [
    {
      icon: <FaClinicMedical className="text-6xl text-primary mb-4" />,
      title: 'Medicamento',
      description: 'Informações detalhadas sobre o medicamento'
    },
    {
      icon: <FaPills className="text-6xl text-primary mb-4" />,
      title: 'Dosagem e Administração',
      description: 'Instruções de uso e dosagem recomendada'
    },
    {
      icon: <FaIndustry className="text-6xl text-primary mb-4" />,
      title: 'Fabricação',
      description: 'Detalhes sobre o fabricante e produção'
    }
  ]
  return slides
}

export default function DetalhesMedicamento({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [medicamento, setMedicamento] = useState<Medicamento | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const response = await fetch(`/api/medicamentos/${params.id}`)
        if (!response.ok) {
          throw new Error('Medicamento não encontrado')
        }
        const data = await response.json()
        setMedicamento(data)
      } catch (error) {
        toast.error('Erro ao carregar medicamento')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchMedicamento()
  }, [params.id, router])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: (i: number) => (
      <div className="w-3 h-3 mx-1 rounded-full bg-gray-300 hover:bg-primary transition-colors" />
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!medicamento) {
    return null
  }

  const carouselSlides = getCarouselSlides(medicamento.tipo)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6"
        >
          <FaArrowLeft className="mr-2" /> Voltar para lista
        </Link>

  
        <div className="mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
          <Slider {...sliderSettings}>
            {carouselSlides.map((slide, index) => (
              <div key={index} className="p-8">
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  {slide.icon}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-gray-600">{slide.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {medicamento.nome}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <FaIndustry className="text-primary text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Fabricante</p>
                  <p className="text-lg">{medicamento.fabricante}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPills className="text-primary text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Tipo e Dosagem</p>
                  <p className="text-lg">
                    {medicamento.tipo} - {medicamento.dosagem}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaBoxes className="text-primary text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Quantidade em Estoque</p>
                  <p className="text-lg">{medicamento.quantidade} unidades</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendarAlt className="text-primary text-xl mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Data de Validade</p>
                  <p className="text-lg">
                    {new Date(medicamento.validade).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Descrição</h2>
            <p className="text-gray-600 leading-relaxed">{medicamento.descricao}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500">
              <p>
                Cadastrado em:{' '}
                {new Date(medicamento.createdAt).toLocaleDateString('pt-BR')}
              </p>
              <p>
                Última atualização:{' '}
                {new Date(medicamento.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 