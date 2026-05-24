import { useState } from 'react'
import { Plus, Calendar, Users, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { formatDate } from '@/lib/utils'
import { useMeetings, useDeleteMeeting } from '@/hooks/useGovernanceData'
import { RowActions } from '@/components/shared/RowActions'
import { EditMeetingDialog } from '@/components/forms/EditMeetingDialog'
import type { Meeting } from '@/types'

export function Reunioes() {
  const { data: mockMeetings = [] } = useMeetings()
  const deleteMeeting = useDeleteMeeting()
  const [editing, setEditing] = useState<Meeting | null>(null)
  const upcomingMeetings = mockMeetings.filter(
    m => new Date(m.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastMeetings = mockMeetings.filter(
    m => new Date(m.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reuniões</h1>
          <p className="text-muted-foreground">Registro e acompanhamento de reuniões</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Reunião
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Próximas</p>
                <p className="text-2xl font-bold">{upcomingMeetings.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Realizadas</p>
                <p className="text-2xl font-bold">{pastMeetings.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{mockMeetings.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Próximas Reuniões</h2>
          <div className="space-y-4">
            {upcomingMeetings.map(meeting => (
              <Card key={meeting.id} className="cursor-pointer hover:shadow-md transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(meeting.date)}
                      </p>
                    </div>
                    <Badge>Agendada</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {meeting.participants.map((p, i) => (
                        <Badge key={i} variant="secondary">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Reuniões Realizadas</h2>
          <div className="space-y-4">
            {pastMeetings.map(meeting => (
              <Card key={meeting.id} className="cursor-pointer hover:shadow-md transition">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{meeting.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(meeting.date)}
                      </p>
                    </div>
                    <Badge variant="secondary">Realizada</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Participantes</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {meeting.participants.map((p, i) => (
                        <Badge key={i} variant="outline">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {meeting.decisions.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Decisões</p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        {meeting.decisions.map((d, i) => (
                          <li key={i} className="text-foreground">{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {meeting.pendencies.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pendências</p>
                      <div className="space-y-2 mt-2">
                        {meeting.pendencies.map(p => (
                          <div key={p.id} className="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="font-medium text-yellow-900">{p.description}</p>
                            <p className="text-xs text-yellow-700">
                              Responsável: {p.responsible} | Prazo: {formatDate(p.dueDate)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {meeting.notes && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Notas</p>
                      <p className="text-sm text-foreground mt-2">{meeting.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
