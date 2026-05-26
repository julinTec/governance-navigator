import { useRef, useState } from 'react'
import { Plus, Trash2, Database, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useWorkstreams, useDeleteWorkstream } from '@/hooks/useGovernanceData'
import { WorkstreamDialog } from '@/components/forms/WorkstreamDialog'
import { exportAllData, importAllData, clearAllData } from '@/lib/dataExport'
import { useQueryClient } from '@tanstack/react-query'

export function Configuracoes() {
  const { data: workstreams = [] } = useWorkstreams()
  const deleteWs = useDeleteWorkstream()
  const qc = useQueryClient()
  const [wsOpen, setWsOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState<string | null>(null)

  const priorities = ['Baixa', 'Média', 'Alta', 'Crítica']
  const statuses = ['Aberta', 'Em Progresso', 'Bloqueada', 'Concluída', 'Cancelada']
  const riskLevels = ['Baixo', 'Médio', 'Alto', 'Crítico']

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Excluir a frente "${name}"?`)) deleteWs.mutate(id)
  }

  const run = async (label: string, fn: () => Promise<void>) => {
    setBusy(label)
    try { await fn(); qc.invalidateQueries() }
    catch (e) { window.alert(`Erro: ${(e as Error).message}`) }
    finally { setBusy(null) }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    if (!window.confirm('Importar dados adicionará registros ao banco atual. Continuar?')) return
    await run('import', () => importAllData(file))
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerenciar estrutura e parâmetros do sistema</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Frentes de Trabalho</CardTitle>
          <Button size="sm" className="gap-2" onClick={() => setWsOpen(true)}>
            <Plus className="h-4 w-4" /> Nova Frente
          </Button>
        </CardHeader>
        <CardContent>
          {workstreams.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma frente cadastrada.</p>
          ) : (
            <div className="space-y-3">
              {workstreams.map((ws) => (
                <div key={ws.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${ws.color ?? 'bg-slate-400'}`} />
                    <div>
                      <p className="font-medium">{ws.name}</p>
                      {ws.description && <p className="text-sm text-muted-foreground">{ws.description}</p>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(ws.id, ws.name)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Parâmetros do Sistema</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Estes valores são definidos pelo sistema e não podem ser alterados.</p>
          <div>
            <p className="text-sm font-medium mb-2">Níveis de Prioridade</p>
            <div className="flex flex-wrap gap-2">{priorities.map((p) => <Badge key={p} variant="outline">{p}</Badge>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Status de Demandas</p>
            <div className="flex flex-wrap gap-2">{statuses.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Níveis de Risco</p>
            <div className="flex flex-wrap gap-2">{riskLevels.map((r) => <Badge key={r} variant="outline">{r}</Badge>)}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dados</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2" onClick={() => run('export', exportAllData)} disabled={busy !== null}>
              <Download className="h-4 w-4" /> Exportar (JSON)
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => fileRef.current?.click()} disabled={busy !== null}>
              <Upload className="h-4 w-4" /> Importar (JSON)
            </Button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium text-destructive flex items-center gap-2"><Database className="h-4 w-4" /> Zona de Perigo</p>
            <p className="text-sm text-muted-foreground mb-3 mt-1">Esta ação apaga todas as demandas, delegações, riscos, reuniões e follow-ups. Não pode ser desfeita.</p>
            <Button
              variant="destructive"
              disabled={busy !== null}
              onClick={() => {
                if (window.confirm('Tem certeza? Esta ação apagará TODOS os dados operacionais.')) {
                  run('clear', clearAllData)
                }
              }}
            >
              {busy === 'clear' ? 'Limpando…' : 'Limpar Todos os Dados'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <WorkstreamDialog open={wsOpen} onOpenChange={setWsOpen} />
    </div>
  )
}
