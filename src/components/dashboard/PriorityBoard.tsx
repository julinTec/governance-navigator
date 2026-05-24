import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getStatusColor, getPriorityColor } from '@/lib/utils'
import { Demand } from '@/types'

interface PriorityBoardProps {
  demands: Demand[]
}

export function PriorityBoard({ demands }: PriorityBoardProps) {
  const priorityDemands = demands
    .filter(d => d.priority === 'critica' || d.priority === 'alta')
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Prioridades do Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {priorityDemands.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma demanda prioritária</p>
          ) : (
            priorityDemands.map(demand => (
              <div
                key={demand.id}
                className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{demand.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{demand.responsible}</p>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <Badge className={getPriorityColor(demand.priority)}>
                    {demand.priority}
                  </Badge>
                  <Badge className={getStatusColor(demand.status)}>
                    {demand.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
