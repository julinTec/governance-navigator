import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Demand } from '@/types'

interface DemandsStatusChartProps {
  demands: Demand[]
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  'aberta': { label: 'Abertas', color: 'hsl(var(--muted-foreground))' },
  'em-progresso': { label: 'Em progresso', color: 'hsl(var(--primary))' },
  'concluida': { label: 'Concluídas', color: 'hsl(142 71% 45%)' },
  'bloqueada': { label: 'Bloqueadas', color: 'hsl(var(--destructive))' },
  'cancelada': { label: 'Canceladas', color: 'hsl(var(--border))' },
}

export function DemandsStatusChart({ demands }: DemandsStatusChartProps) {
  const { data, total } = useMemo(() => {
    const counts: Record<string, number> = {}
    demands.forEach(d => {
      counts[d.status] = (counts[d.status] ?? 0) + 1
    })
    const data = Object.keys(STATUS_CONFIG)
      .map(key => ({
        key,
        name: STATUS_CONFIG[key].label,
        value: counts[key] ?? 0,
        color: STATUS_CONFIG[key].color,
      }))
      .filter(d => d.value > 0)
    return { data, total: demands.length }
  }, [demands])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm">Demandas por Status</CardTitle>
        <span className="text-xs text-muted-foreground">Total: {total}</span>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Sem demandas cadastradas
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={2}
                    stroke="hsl(var(--card))"
                    strokeWidth={2}
                  >
                    {data.map(entry => (
                      <Cell key={entry.key} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      fontSize: '12px',
                    }}
                    formatter={(value, name) => [`${value}`, `${name}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {data.map(item => {
                const pct = total > 0 ? Math.round((item.value / total) * 100) : 0
                return (
                  <div key={item.key} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2 h-2 rounded-sm shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="truncate text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium tabular-nums">
                      {item.value} <span className="text-muted-foreground text-[10px]">({pct}%)</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
