export type UserRole = 'admin' | 'collaborator'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface UserCredentials {
  email: string
  password: string
} 