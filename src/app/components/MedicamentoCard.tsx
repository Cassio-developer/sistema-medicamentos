import Image from 'next/image'
import Link from 'next/link'

interface MedicamentoCardProps {
  id: number
  nome: string
  fabricante: string
  descricao: string
  dosagem: string
  tipo: string
  quantidade: number
  validade: string
  imagem?: string
}

export default function MedicamentoCard({
  id,
  nome,
  fabricante,
  descricao,
  dosagem,
  tipo,
  quantidade,
  validade,
  imagem,
}: MedicamentoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <Link href={`/medicamentos/${id}`}>
        <div className="relative h-48 mb-4">
          <Image
            src={imagem || '/no-image.png'}
            alt={nome}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mb-2">{nome}</h3>
        <p className="text-gray-600 mb-2">Fabricante: {fabricante}</p>
        <p className="text-gray-600 mb-2">Dosagem: {dosagem}</p>
        <p className="text-gray-600 mb-2">Tipo: {tipo}</p>
        <p className="text-gray-600 mb-2">Quantidade: {quantidade}</p>
        <p className="text-gray-600">
          Validade: {new Date(validade).toLocaleDateString('pt-BR')}
        </p>
      </Link>
    </div>
  )
} 