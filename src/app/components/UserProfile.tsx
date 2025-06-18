'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaSignOutAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useUser } from '@/contexts/UserContext'

export default function UserProfile() {
  const router = useRouter()
  const { user, setUser } = useUser()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })

      if (response.ok) {
        setUser(null) 
        toast.success('Logout realizado com sucesso!')
        router.replace('/welcome') 
      } else {
        toast.error('Erro ao fazer logout')
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      toast.error('Erro ao fazer logout')
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          {user.image ? (
            <Image
              src={`/uploads/${user.image}`}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <svg
              className="w-full h-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">
            Olá, {user.name.split(' ')[0]}
          </span>
          <span className="text-xs text-gray-300">
            {user.email}
          </span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 hover:bg-indigo-700 rounded-full transition-colors flex items-center justify-center"
        title="Sair"
      >
        <FaSignOutAlt className="w-5 h-5 text-white" />
      </button>
    </div>
  )
} 