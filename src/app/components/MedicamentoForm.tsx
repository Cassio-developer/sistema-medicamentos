import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MedicamentoForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    fabricante: '',
    descricao: '',
    dosagem: '',
    tipo: '',
    quantidade: '',
    validade: '',
    imagem: '',
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/medicamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantidade: parseInt(formData.quantidade),
        }),
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.error('Erro ao cadastrar medicamento')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          
          const fileName = data.url.split('/').pop()
          setFormData((prev) => ({ ...prev, imagem: fileName }))
          
          setPreviewImage(URL.createObjectURL(file))
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="fabricante" className="block text-sm font-medium text-gray-700">
          Fabricante
        </label>
        <input
          type="text"
          id="fabricante"
          name="fabricante"
          value={formData.fabricante}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="dosagem" className="block text-sm font-medium text-gray-700">
          Dosagem
        </label>
        <input
          type="text"
          id="dosagem"
          name="dosagem"
          value={formData.dosagem}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione um tipo</option>
          <option value="Comprimido">Comprimido</option>
          <option value="Líquido">Líquido</option>
          <option value="Cápsula">Cápsula</option>
          <option value="Pomada">Pomada</option>
          <option value="Injetável">Injetável</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
          Quantidade
        </label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="validade" className="block text-sm font-medium text-gray-700">
          Data de Validade
        </label>
        <input
          type="date"
          id="validade"
          name="validade"
          value={formData.validade}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <label htmlFor="imagem" className="block text-sm font-medium text-gray-700 mb-2">
          Imagem do Medicamento
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <div className="flex flex-col items-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg mb-4"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="imagem"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Selecionar arquivo</span>
                  <input
                    id="imagem"
                    name="imagem"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">ou arraste e solte</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cadastrar
        </button>
      </div>
    </form>
  )
} 