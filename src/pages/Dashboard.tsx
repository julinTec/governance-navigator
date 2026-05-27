import { AlertCircle, CheckCircle2, Clock, TrendingUp, Users } from 'lucide-react'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { PriorityBoard } from '@/components/dashboard/PriorityBoard'
import { RiskRadar } from '@/components/dashboard/RiskRadar'
import { WeeklySummary } from '@/components/dashboard/WeeklySummary'
import { useDemands, useRisks, useMeetings, useDelegations } from '@/hooks/useGovernanceData'

export function Dashboard() {
  const { data: mockDemands = [] } = useDemands()
  const { data: mockRisks = [] } = useRisks()
  const { data: mockMeetings = [] } = useMeetings()
  const { data: mockDelegations = [] } = useDelegations()

  const today = new Date().toISOString().split('T')[0]
  const finished = (s: string) => s === 'concluida' || s === 'cancelada'

  const activeDemands = mockDemands.filter(d => !finished(d.status)).length
  const overdueDemands = mockDemands.filter(
    d => d.dueDate && d.dueDate < today && !finished(d.status)
  ).length
  const criticalRisks = mockRisks.filter(r => r.level === 'critico' && r.status !== 'mitigado' && r.status !== 'encerrado').length
  const pendingDelegations = mockDelegations.filter(d => d.status === 'pendente' || d.status === 'atrasada').length
  const completedDemands = mockDemands.filter(d => d.status === 'concluida').length
  const completionRate = mockDemands.length > 0
    ? Math.round((completedDemands / mockDemands.length) * 100)
    : 0

  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Demandas Ativas"
          value={activeDemands}
          icon={TrendingUp}
          description="Em andamento ou aguardando"
          color="default"
        />
        <KpiCard
          title="Demandas Atrasadas"
          value={overdueDemands}
          icon={Clock}
          description="Prazo vencido"
          color="warning"
        />
        <KpiCard
          title="Riscos Críticos"
          value={criticalRisks}
          icon={AlertCircle}
          description="Ação imediata"
          color="danger"
        />
        <KpiCard
          title="Delegações Pendentes"
          value={pendingDelegations}
          icon={Users}
          description="Aguardando execução"
          color="warning"
        />
        <KpiCard
          title="Taxa de Conclusão"
          value={`${completionRate}%`}
          icon={CheckCircle2}
          description={`${completedDemands} de ${mockDemands.length} demandas`}
          color="success"
        />
      </div>


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PriorityBoard demands={mockDemands} />
          <WeeklySummary demands={mockDemands} meetings={mockMeetings} />
        </div>

        <div className="space-y-6">
          <RiskRadar risks={mockRisks} />
        </div>
      </div>
    </div>
  )
}
