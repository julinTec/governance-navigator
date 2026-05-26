import { AlertCircle, Clock, TrendingUp, Users } from 'lucide-react'
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
  const openDemands = mockDemands.filter(d => d.status === 'aberta').length
  const overdueDemands = mockDemands.filter(d => d.dueDate < new Date().toISOString().split('T')[0] && d.status !== 'concluida').length
  const criticalRisks = mockRisks.filter(r => r.level === 'critico').length
  const pendingDelegations = mockDelegations.filter(d => d.status === 'pendente' || d.status === 'atrasada').length

  return (
    <div className="p-6 space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Demandas Abertas"
          value={openDemands}
          icon={TrendingUp}
          description="Aguardando início"
          color="default"
        />
        <KpiCard
          title="Demandas Atrasadas"
          value={overdueDemands}
          icon={Clock}
          description="Fora do prazo"
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
