import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DemandForm() {
  const [formData, setFormData] = useState({
    title: '',
    origin: '',
    workstream: '',
    responsible: '',
    priority: 'media',
    status: 'aberta',
    dueDate: '',
    nextStep: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      title: '',
      origin: '',
      workstream: '',
      responsible: '',
      priority: 'media',
      status: 'aberta',
      dueDate: '',
      nextStep: '',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Demanda</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                placeholder="Título da demanda"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origem *</Label>
              <Input
                id="origin"
                placeholder="Ex: Demanda Interna"
                value={formData.origin}
                onChange={(e) =>
                  setFormData({ ...formData, origin: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workstream">Frente de Trabalho *</Label>
              <Select
                value={formData.workstream}
                onValueChange={(value) =>
                  setFormData({ ...formData, workstream: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar frente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infraestrutura">Infraestrutura TI</SelectItem>
                  <SelectItem value="legislacao">Legislação e Compliance</SelectItem>
                  <SelectItem value="processos">Processos Administrativos</SelectItem>
                  <SelectItem value="orcamento">Orçamento e Finanças</SelectItem>
                  <SelectItem value="pessoas">Gestão de Pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável *</Label>
              <Select
                value={formData.responsible}
                onValueChange={(value) =>
                  setFormData({ ...formData, responsible: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                  <SelectItem value="Carlos Mendes">Carlos Mendes</SelectItem>
                  <SelectItem value="Fernanda Costa">Fernanda Costa</SelectItem>
                  <SelectItem value="Roberto Alves">Roberto Alves</SelectItem>
                  <SelectItem value="Mariana Oliveira">Mariana Oliveira</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aberta">Aberta</SelectItem>
                  <SelectItem value="em-progresso">Em Progresso</SelectItem>
                  <SelectItem value="bloqueada">Bloqueada</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Entrega *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextStep">Próximo Passo</Label>
            <Input
              id="nextStep"
              placeholder="Descrever próximo passo"
              value={formData.nextStep}
              onChange={(e) =>
                setFormData({ ...formData, nextStep: e.target.value })
              }
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Criar Demanda</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
