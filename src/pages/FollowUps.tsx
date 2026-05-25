import { useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { getPriorityColor, getStatusColor, formatDate, getDaysUntil, isUrgent } from '@/lib/utils'
import { useFollowUps, useDeleteFollowUp } from '@/hooks/useGovernanceData'
import { RowActions } from '@/components/shared/RowActions'
import { EditFollowUpDialog } from '@/components/forms/EditFollowUpDialog'
import type { FollowUp } from '@/types'

export function FollowUps() {
  const { data: mockFollowUps = [] } = useFollowUps()
  const deleteFollowUp = useDeleteFollowUp()
  const [editing, setEditing] = useState<FollowUp | null>(null)
  const urgentFollowUps = mockFollowUps.filter(f => isUrgent(f.followUpDate))
  const openFollowUps = mockFollowUps.filter(f => f.status === 'aberta')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Follow-ups</h1>
          <p className="text-muted-foreground">Acompanhamento e cobranças de demandas</p>
        </div>
        <Button className="gap-2" onClick={() => setEditing({
          id: '', person: '', subject: '', lastInteraction: '', nextAction: '',
          followUpDate: '', status: 'aberta', priority: 'media',
        })}>
          <Plus className="h-4 w-4" />
          Novo Follow-up
        </Button>
      </div>

      {/* Alerts */}
      {urgentFollowUps.length > 0 && (
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex gap-3 items-start">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">
                {urgentFollowUps.length} follow-up(s) vencido(s) ou para vencer em breve
              </h3>
              <p className="text-sm text-orange-800 mt-1">
                {urgentFollowUps.map(f => f.person).join(', ')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-blue-600">{mockFollowUps.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-yellow-500">
          <p className="text-xs text-muted-foreground">Abertos</p>
          <p className="text-2xl font-bold text-yellow-600">{openFollowUps.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500">
          <p className="text-xs text-muted-foreground">Urgentes</p>
          <p className="text-2xl font-bold text-orange-600">{urgentFollowUps.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-xs text-muted-foreground">Concluídos</p>
          <p className="text-2xl font-bold text-green-600">
            {mockFollowUps.filter(f => f.status === 'concluida').length}
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pessoa</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Última Interação</TableHead>
              <TableHead>Próxima Ação</TableHead>
              <TableHead>Data de Cobrança</TableHead>
              <TableHead>Dias</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockFollowUps.map(followUp => {
              const daysUntil = getDaysUntil(followUp.followUpDate)
              const urgent = isUrgent(followUp.followUpDate)

              return (
                <TableRow
                  key={followUp.id}
                  className={`hover:bg-muted/50 ${
                    urgent ? 'bg-orange-50' : ''
                  }`}
                >
                  <TableCell className="font-medium">{followUp.person}</TableCell>
                  <TableCell className="max-w-xs">{followUp.subject}</TableCell>
                  <TableCell className="text-sm">{formatDate(followUp.lastInteraction)}</TableCell>
                  <TableCell className="text-sm max-w-xs truncate">{followUp.nextAction}</TableCell>
                  <TableCell className="text-sm">{formatDate(followUp.followUpDate)}</TableCell>
                  <TableCell className="text-sm">
                    <span className={daysUntil < 0 ? 'text-red-600 font-semibold' : ''}>
                      {daysUntil < 0 ? `${Math.abs(daysUntil)} dias atrás` : `${daysUntil} dias`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(followUp.status)}>
                      {followUp.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(followUp.priority)}>
                      {followUp.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RowActions
                      onEdit={() => setEditing(followUp)}
                      onDelete={() => deleteFollowUp.mutate(followUp.id)}
                      deleteConfirmMessage={`Excluir follow-up de "${followUp.person}"?`}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      <EditFollowUpDialog
        followUp={editing}
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
      />

    </div>
  )
}
