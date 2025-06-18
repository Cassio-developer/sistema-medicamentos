'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import MedicamentoForm from '@/app/components/MedicamentoForm'

const medicamentoSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  fabricante: z.string().min(2, 'O fabricante deve ter pelo menos 2 caracteres'),
  descricao: z.string().min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  dosagem: z.string().min(1, 'A dosagem é obrigatória'),
  tipo: z.string().min(1, 'O tipo é obrigatório'),
  quantidade: z.number().min(1, 'A quantidade deve ser maior que zero'),
  validade: z.string().min(1, 'A data de validade é obrigatória'),
})

type MedicamentoForm = z.infer<typeof medicamentoSchema>

export default function NovoProduto() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Cadastrar Novo Medicamento</h1>
      <MedicamentoForm />
    </div>
  )
} 