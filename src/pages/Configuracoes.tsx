import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { mockWorkstreams, mockUsers } from '@/data/mockData'

export function Configuracoes() {
  const priorities = ['Baixa', 'Média', 'Alta', 'Crítica']
  const statuses = ['Aberta', 'Em Progresso', 'Bloqueada', 'Concluída', 'Cancelada']
  const riskLevels = ['Baixo', 'Médio', 'Alto', 'Crítico']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerenciar estrutura e parâmetros do sistema</p>
      </div>

      {/* Frentes de Trabalho */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Frentes de Trabalho</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Frente
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWorkstreams.map(ws => (
              <div key={ws.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded ${ws.color}`}
                  ></div>
                  <div>
                    <p className="font-medium">{ws.name}</p>
                    {ws.description && (
                      <p className="text-sm text-muted-foreground">{ws.description}</p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Responsáveis */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Responsáveis/Usuários</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Usuário
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Badge variant="outline">{user.department}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prioridades */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Níveis de Prioridade</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Prioridade
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {priorities.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline">{p}</Badge>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Status de Demandas</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Status
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline">{s}</Badge>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Níveis de Risco */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Níveis de Risco</CardTitle>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Nível
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {riskLevels.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <Badge variant="outline">{r}</Badge>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-3 w-3 text-red-600" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exportar/Importar */}
      <Card>
        <CardHeader>
          <CardTitle>Dados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Você pode exportar e importar dados do sistema em formato JSON
            </p>
            <div className="flex gap-2">
              <Button variant="outline">Exportar Dados</Button>
              <Button variant="outline">Importar Dados</Button>
            </div>
          </div>
          <Separator />
          <div className="pt-3">
            <p className="text-sm font-medium text-destructive">Zona de Perigo</p>
            <p className="text-sm text-muted-foreground mb-3 mt-1">
              Esta ação não pode ser desfeita
            </p>
            <Button variant="destructive">Limpar Todos os Dados</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
