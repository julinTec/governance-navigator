import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: 'default' | 'danger' | 'warning' | 'success'
}

const iconClasses: Record<NonNullable<KpiCardProps['color']>, string> = {
  default: 'bg-blue-50 text-blue-700 border-blue-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  success: 'bg-green-50 text-green-700 border-green-200',
}

const borderClasses: Record<NonNullable<KpiCardProps['color']>, string> = {
  default: 'border-l-blue-500',
  danger: 'border-l-red-500',
  warning: 'border-l-yellow-500',
  success: 'border-l-green-500',
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  color = 'default',
}: KpiCardProps) {
  return (
    <Card className={`border-l-4 ${borderClasses[color]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${iconClasses[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trendValue && (
          <p className={`text-xs font-semibold mt-2 ${
            trend === 'up' ? 'text-red-600' : trend === 'down' ? 'text-green-600' : 'text-gray-600'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
