import { FaGithub, FaLinkedin } from 'react-icons/fa'
import MedicineIcon from './icons/MedicineIcon'
import HealthIcon from './icons/HealthIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center space-x-8">
            <MedicineIcon />
            <HealthIcon />
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/seu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Sistema de Gerenciamento de Medicamentos
            </p>
            <p className="text-gray-500 text-xs">
              Desenvolvido com Next.js, Tailwind CSS e Prisma
            </p>
            <p className="text-gray-400 text-xs">
              © {currentYear} Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 