import { Plus } from 'lucide-react'
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
import { getRiskColor } from '@/lib/utils'
import { mockRisks } from '@/data/mockData'

export function Riscos() {
  const activeRisks = mockRisks.filter(r => r.status === 'ativo')
  const criticalRisks = mockRisks.filter(r => r.level === 'critico')
  const highRisks = mockRisks.filter(r => r.level === 'alto')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Riscos</h1>
          <p className="text-muted-foreground">Acompanhamento e mitigação de riscos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Risco
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500">
          <p className="text-xs text-muted-foreground">Críticos</p>
          <p className="text-2xl font-bold text-red-600">{criticalRisks.length}</p>
          <p className="text-xs text-red-600 mt-2">Ação imediata</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500">
          <p className="text-xs text-muted-foreground">Altos</p>
          <p className="text-2xl font-bold text-orange-600">{highRisks.length}</p>
          <p className="text-xs text-orange-600 mt-2">Monitoramento contínuo</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-xs text-muted-foreground">Ativos</p>
          <p className="text-2xl font-bold text-blue-600">{activeRisks.length}</p>
          <p className="text-xs text-blue-600 mt-2">Em acompanhamento</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-2xl font-bold text-green-600">{mockRisks.length}</p>
          <p className="text-xs text-green-600 mt-2">Riscos cadastrados</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Impacto</TableHead>
              <TableHead>Probabilidade</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Plano de Mitigação</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRisks.map(risk => (
              <TableRow key={risk.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium max-w-xs">{risk.description}</TableCell>
                <TableCell>
                  <Badge className={getRiskColor(risk.impact)}>
                    {risk.impact}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{risk.probability}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getRiskColor(risk.level)}>
                    {risk.level}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{risk.responsible}</TableCell>
                <TableCell className="text-sm max-w-xs truncate">
                  {risk.mitigationPlan}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={risk.status === 'ativo' ? 'default' : 'secondary'}
                  >
                    {risk.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Risk Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {criticalRisks.map(risk => (
          <Card key={risk.id} className="p-4 border-l-4 border-l-red-500">
            <h3 className="font-semibold text-red-900">{risk.description}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Plano de Mitigação:</strong> {risk.mitigationPlan}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Responsável:</strong> {risk.responsible}
            </p>
            <div className="flex gap-2 mt-4">
              <Badge className={getRiskColor(risk.impact)}>
                Impacto: {risk.impact}
              </Badge>
              <Badge variant="outline">Prob: {risk.probability}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
