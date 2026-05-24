import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Demand, Meeting } from '@/types'

interface WeeklySummaryProps {
  demands: Demand[]
  meetings: Meeting[]
}

export function WeeklySummary({ demands, meetings }: WeeklySummaryProps) {
  const thisWeekDemands = demands.filter(d => {
    const dueDate = new Date(d.dueDate)
    const today = new Date()
    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return dueDate >= today && dueDate <= weekLater
  })

  const completedThisWeek = thisWeekDemands.filter(d => d.status === 'concluida').length
  const inProgressThisWeek = thisWeekDemands.filter(d => d.status === 'em-progresso').length
  const blockedThisWeek = thisWeekDemands.filter(d => d.status === 'bloqueada').length

  const thisWeekMeetings = meetings.filter(m => {
    const meetingDate = new Date(m.date)
    const today = new Date()
    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return meetingDate >= today && meetingDate <= weekLater
  })

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
            <div className="space-y-2">
              <div className="text-sm p-2 bg-blue-50 rounded border border-blue-200">
                <p className="font-medium text-blue-900">Acompanhamento</p>
                <p className="text-xs text-blue-700">em dia</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
