import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse a date string as a LOCAL date.
 * Fixes the off-by-one issue where 'YYYY-MM-DD' would be interpreted as UTC midnight
 * and shifted backwards a day in negative-offset timezones (e.g. America/Sao_Paulo).
 */
export function parseLocalDate(date: string): Date {
  if (!date) return new Date(NaN)
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(date)
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  }
  return new Date(date)
}

export function formatDate(date: string): string {
  if (!date) return ''
  return parseLocalDate(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string): string {
  if (!date) return ''
  return parseLocalDate(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function getDaysSince(date: string): number {
  const now = startOfDay(new Date())
  const pastDate = startOfDay(parseLocalDate(date))
  const diffDays = Math.round((now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24))
  return Math.abs(diffDays)
}

export function getDaysUntil(date: string): number {
  const now = startOfDay(new Date())
  const futureDate = startOfDay(parseLocalDate(date))
  const diffDays = Math.round((futureDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
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
