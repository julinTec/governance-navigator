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
import { getStatusColor, getRiskColor, formatDate } from '@/lib/utils'
import { useDelegations, useDeleteDelegation } from '@/hooks/useGovernanceData'
import { RowActions } from '@/components/shared/RowActions'
import { EditDelegationDialog } from '@/components/forms/EditDelegationDialog'
import type { Delegation } from '@/types'

export function Delegacoes() {
  const { data: mockDelegations = [] } = useDelegations()
  const deleteDelegation = useDeleteDelegation()
  const [editing, setEditing] = useState<Delegation | null>(null)
  const overdueDelegations = mockDelegations.filter(d => d.status === 'atrasada')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delegações</h1>
          <p className="text-muted-foreground">Acompanhamento de entregas delegadas</p>
        </div>
        <Button className="gap-2" onClick={() => setEditing({
          id: '', responsible: '', deliverable: '', dueDate: '', lastUpdate: '',
          status: 'pendente', riskLevel: 'baixo', notes: '',
        })}>
          <Plus className="h-4 w-4" />
          Nova Delegação
        </Button>
      </div>

      {/* Alerts for overdue */}
      {overdueDelegations.length > 0 && (
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex gap-3 items-start">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900">
                {overdueDelegations.length} delegação(ões) atrasada(s)
              </h3>
              <p className="text-sm text-orange-800 mt-1">
                {overdueDelegations.map(d => d.responsible).join(', ')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Responsável</TableHead>
              <TableHead>Entrega</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Último Update</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risco</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDelegations.map(delegation => (
              <TableRow
                key={delegation.id}
                className={`hover:bg-muted/50 ${
                  delegation.status === 'atrasada' ? 'bg-red-50' : ''
                }`}
              >
                <TableCell className="font-medium">{delegation.responsible}</TableCell>
                <TableCell className="max-w-xs">{delegation.deliverable}</TableCell>
                <TableCell className="text-sm">{formatDate(delegation.dueDate)}</TableCell>
                <TableCell className="text-sm">{formatDate(delegation.lastUpdate)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(delegation.status)}>
                    {delegation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getRiskColor(delegation.riskLevel)}>
                    {delegation.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                  {delegation.notes}
                </TableCell>
                <TableCell>
                  <RowActions
                    onEdit={() => setEditing(delegation)}
                    onDelete={() => deleteDelegation.mutate(delegation.id)}
                    deleteConfirmMessage={`Excluir a delegação de "${delegation.responsible}"?`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <EditDelegationDialog
        delegation={editing}
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
      />


      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{mockDelegations.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Pendentes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {mockDelegations.filter(d => d.status === 'pendente').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Atrasadas</p>
          <p className="text-2xl font-bold text-red-600">
            {mockDelegations.filter(d => d.status === 'atrasada').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Concluídas</p>
          <p className="text-2xl font-bold text-green-600">
            {mockDelegations.filter(d => d.status === 'concluida').length}
          </p>
        </Card>
      </div>
    </div>
  )
}
