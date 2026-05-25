import { useState } from 'react'
import { Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getPriorityColor, getStatusColor, getRiskColor, formatDate } from '@/lib/utils'
import { useDemands, useDeleteDemand } from '@/hooks/useGovernanceData'
import { RowActions } from '@/components/shared/RowActions'
import { EditDemandDialog } from '@/components/forms/EditDemandDialog'
import type { Demand } from '@/types'

export function Backlog() {
  const { data: mockDemands = [] } = useDemands()
  const deleteDemand = useDeleteDemand()
  const [editing, setEditing] = useState<Demand | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('todas')
  const [filterPriority, setFilterPriority] = useState<string>('todas')
  const [filterResponsible, setFilterResponsible] = useState<string>('todas')
  const [searchTerm, setSearchTerm] = useState('')

  let filtered = mockDemands

  if (filterStatus !== 'todas') {
    filtered = filtered.filter(d => d.status === filterStatus)
  }
  if (filterPriority !== 'todas') {
    filtered = filtered.filter(d => d.priority === filterPriority)
  }
  if (filterResponsible !== 'todas') {
    filtered = filtered.filter(d => d.responsible === filterResponsible)
  }
  if (searchTerm) {
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Backlog de Demandas</h1>
          <p className="text-muted-foreground">Total: {filtered.length} demanda(s)</p>
        </div>
        <Button className="gap-2" onClick={() => setEditing({
          id: '', title: '', origin: '', workstream: '', responsible: '',
          priority: 'media', status: 'aberta', dueDate: '', riskLevel: 'baixo',
          nextStep: '', createdAt: '', updatedAt: '',
        })}>
          <Plus className="h-4 w-4" />
          Nova Demanda
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4 flex-wrap items-end">
          <div className="flex-1 min-w-60">
            <label className="text-sm font-medium">Buscar</label>
            <Input
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="min-w-40">
            <label className="text-sm font-medium">Status</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="aberta">Aberta</SelectItem>
                <SelectItem value="em-progresso">Em Progresso</SelectItem>
                <SelectItem value="bloqueada">Bloqueada</SelectItem>
                <SelectItem value="concluida">Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-40">
            <label className="text-sm font-medium">Prioridade</label>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-40">
            <label className="text-sm font-medium">Responsável</label>
            <Select value={filterResponsible} onValueChange={setFilterResponsible}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos</SelectItem>
                <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                <SelectItem value="Carlos Mendes">Carlos Mendes</SelectItem>
                <SelectItem value="Fernanda Costa">Fernanda Costa</SelectItem>
                <SelectItem value="Roberto Alves">Roberto Alves</SelectItem>
                <SelectItem value="Mariana Oliveira">Mariana Oliveira</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Frente</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risco</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  Nenhuma demanda encontrada
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(demand => (
                <TableRow key={demand.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-xs truncate">{demand.title}</TableCell>
                  <TableCell>{demand.origin}</TableCell>
                  <TableCell className="text-sm">{demand.workstream}</TableCell>
                  <TableCell className="text-sm">{demand.responsible}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(demand.priority)}>
                      {demand.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(demand.status)}>
                      {demand.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(demand.riskLevel)}>
                      {demand.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{formatDate(demand.dueDate)}</TableCell>
                  <TableCell>
                    <RowActions
                      onEdit={() => setEditing(demand)}
                      onDelete={() => deleteDemand.mutate(demand.id)}
                      deleteConfirmMessage={`Excluir a demanda "${demand.title}"?`}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <EditDemandDialog
        demand={editing}
        open={!!editing}
        onOpenChange={(o) => !o && setEditing(null)}
      />
    </div>
  )
}
