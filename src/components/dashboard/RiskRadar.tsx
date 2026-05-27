import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Risk } from '@/types'

interface RiskRadarProps {
  risks: Risk[]
}

export function RiskRadar({ risks }: RiskRadarProps) {
  const activeRisks = risks.filter(r => r.status !== 'mitigado' && r.status !== 'encerrado')
  const criticalRisks = activeRisks.filter(r => r.level === 'critico').length
  const highRisks = activeRisks.filter(r => r.level === 'alto').length
  const mediumRisks = activeRisks.filter(r => r.level === 'medio').length
  const lowRisks = activeRisks.filter(r => r.level === 'baixo').length

  const total = activeRisks.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Mapa de Riscos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-sm font-medium">Crítico</span>
              </div>
              <span className="text-lg font-bold text-red-600">{criticalRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${total > 0 ? (criticalRisks / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium">Alto</span>
              </div>
              <span className="text-lg font-bold text-orange-500">{highRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${total > 0 ? (highRisks / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">Médio</span>
              </div>
              <span className="text-lg font-bold text-yellow-500">{mediumRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${total > 0 ? (mediumRisks / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm font-medium">Baixo</span>
              </div>
              <span className="text-lg font-bold text-green-600">{lowRisks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${total > 0 ? (lowRisks / total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
