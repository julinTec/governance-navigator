import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getDaysSince(date: string): number {
  const now = new Date()
  const pastDate = new Date(date)
  const diffTime = Math.abs(now.getTime() - pastDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getDaysUntil(date: string): number {
  const now = new Date()
  const futureDate = new Date(date)
  const diffTime = futureDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function isOverdue(dueDate: string): boolean {
  return getDaysUntil(dueDate) < 0
}

export function isUrgent(dueDate: string): boolean {
  const daysUntil = getDaysUntil(dueDate)
  return daysUntil >= 0 && daysUntil <= 3
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'critica':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'alta':
      return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'media':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'baixa':
      return 'bg-green-100 text-green-800 border-green-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'concluida':
    case 'concluído':
      return 'bg-green-100 text-green-800 border-green-300'
    case 'em-progresso':
      return 'bg-blue-100 text-blue-800 border-blue-300'
    case 'bloqueada':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'atrasada':
      return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'aberta':
      return 'bg-gray-100 text-gray-800 border-gray-300'
    case 'cancelada':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function getRiskColor(level: string): string {
  switch (level) {
    case 'critico':
      return 'bg-red-100 text-red-800 border-red-300'
    case 'alto':
      return 'bg-orange-100 text-orange-800 border-orange-300'
    case 'medio':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'baixo':
      return 'bg-green-100 text-green-800 border-green-300'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}

export function abbreviateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + '...'
}
