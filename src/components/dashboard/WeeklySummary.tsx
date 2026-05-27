import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Demand, Meeting } from '@/types'

interface WeeklySummaryProps {
  demands: Demand[]
  meetings: Meeting[]
}

export function WeeklySummary({ demands, meetings }: WeeklySummaryProps) {
  const todayStr = new Date().toISOString().split('T')[0]
  const weekLaterStr = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const inRange = (iso?: string) =>
    !!iso && iso >= todayStr && iso <= weekLaterStr

  const thisWeekDemands = demands.filter(d => inRange(d.dueDate))

  const openThisWeek = thisWeekDemands.filter(d => d.status === 'aberta').length
  const inProgressThisWeek = thisWeekDemands.filter(d => d.status === 'em-progresso').length
  const completedThisWeek = thisWeekDemands.filter(d => d.status === 'concluida').length
  const blockedThisWeek = thisWeekDemands.filter(d => d.status === 'bloqueada').length

  const thisWeekMeetings = meetings.filter(m => inRange(m.date))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumo da Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Demandas desta semana</p>
              <p className="text-2xl font-bold">{thisWeekDemands.length}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Abertas:</span>
                <span className="font-medium text-slate-700">{openThisWeek}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Em progresso:</span>
                <span className="font-medium text-blue-600">{inProgressThisWeek}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Concluídas:</span>
                <span className="font-medium text-green-600">{completedThisWeek}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Bloqueadas:</span>
                <span className="font-medium text-red-600">{blockedThisWeek}</span>
              </div>
            </div>
          </div>


          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Reuniões agendadas</p>
              <p className="text-2xl font-bold">{thisWeekMeetings.length}</p>
            </div>
            {thisWeekMeetings.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm p-2 bg-blue-50 rounded border border-blue-200">
                  <p className="font-medium text-blue-900">Acompanhamento</p>
                  <p className="text-xs text-blue-700">em dia</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
