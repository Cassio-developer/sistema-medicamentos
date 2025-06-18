'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaTrashAlt } from 'react-icons/fa'
import DeleteModal from './components/DeleteModal'
import { toast } from 'react-toastify'

interface Medicamento {
  id: number
  nome: string
  fabricante: string
  descricao: string
  dosagem: string
  tipo: string
  quantidade: number
  validade: Date
  imagem?: string | null
  createdAt: Date
  updatedAt: Date
}

export default function Home() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  useEffect(() => {
    fetchMedicamentos()

   
    fetch('/api/relatorio', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success('Relatório enviado com sucesso!')
        } else {
          toast.error(data.message || 'Erro ao enviar relatório')
        }
      })
      .catch(error => {
        console.error('Erro ao enviar relatório:', error)
        toast.error('Erro ao enviar relatório')
      })
  }, [])

  async function fetchMedicamentos() {
    try {
      const response = await fetch('/api/medicamentos')
      if (!response.ok) {
        throw new Error('Erro ao buscar medicamentos')
      }
      const data = await response.json()
      setMedicamentos(data)
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedMedicamento) return

    setDeletingId(selectedMedicamento.id)
    try {
      const response = await fetch(`/api/medicamentos/${selectedMedicamento.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setMedicamentos((prev) =>
          prev.filter((med) => med.id !== selectedMedicamento.id)
        )
        toast.success('Medicamento excluído com sucesso!')
      } else {
        toast.error('Erro ao excluir medicamento')
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
      toast.error('Erro ao excluir medicamento')
    } finally {
      setDeleteModalOpen(false)
      setSelectedMedicamento(null)
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Sistema de Cadastro de Remédios
        </h1>
        <Link
          href="/medicamentos/novo"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Novo Medicamento
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicamentos.map((medicamento) => (
          <div
            key={medicamento.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group"
          >
            <Link href={`/medicamentos/${medicamento.id}`}>
              <div className="relative h-48 bg-gray-200">
                {medicamento.imagem ? (
                  <Image
                    src={`/uploads/${medicamento.imagem}`}
                    alt={medicamento.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {medicamento.nome}
                </h2>
                <p className="text-gray-600 mb-2">
                  Fabricante: {medicamento.fabricante}
                </p>
                <p className="text-gray-600 mb-2">
                  Tipo: {medicamento.tipo}
                </p>
                <p className="text-gray-600 mb-2">
                  Quantidade: {medicamento.quantidade}
                </p>
                <p className="text-gray-600">
                  Validade: {new Date(medicamento.validade).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                setSelectedMedicamento(medicamento)
                setDeleteModalOpen(true)
              }}
              className={`absolute bottom-4 right-4 p-2 rounded-full 
                ${deletingId === medicamento.id
                  ? 'bg-red-100 animate-bounce'
                  : 'bg-white shadow-md hover:bg-red-50'
                } 
                opacity-0 group-hover:opacity-100 transition-all duration-200`}
            >
              <FaTrashAlt className={`w-5 h-5 ${
                deletingId === medicamento.id ? 'text-red-600' : 'text-red-500'
              }`} />
            </button>
          </div>
        ))}
      </div>

      {medicamentos.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            Nenhum medicamento cadastrado ainda.
          </p>
          <Link
            href="/medicamentos/novo"
            className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Cadastrar Primeiro Medicamento
          </Link>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedMedicamento(null)
        }}
        onConfirm={handleDelete}
        medicamentoNome={selectedMedicamento?.nome || ''}
      />
    </div>
  )
}
