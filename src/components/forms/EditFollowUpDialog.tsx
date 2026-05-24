import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { FollowUp } from '@/types'
import { useUpdateFollowUp } from '@/hooks/useGovernanceData'

interface Props {
  followUp: FollowUp | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditFollowUpDialog({ followUp, open, onOpenChange }: Props) {
  const update = useUpdateFollowUp()
  const [form, setForm] = useState<FollowUp | null>(followUp)
  useEffect(() => { setForm(followUp) }, [followUp])
  if (!form) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await update.mutateAsync(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Editar Follow-up</DialogTitle></DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Pessoa</Label>
              <Input value={form.person} onChange={(e) => setForm({ ...form, person: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Assunto</Label>
              <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Próxima Ação</Label>
            <Input value={form.nextAction} onChange={(e) => setForm({ ...form, nextAction: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Última Interação</Label>
              <Input type="date" value={form.lastInteraction?.slice(0, 10) ?? ''} onChange={(e) => setForm({ ...form, lastInteraction: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Data de Cobrança</Label>
              <Input type="date" value={form.followUpDate?.slice(0, 10) ?? ''} onChange={(e) => setForm({ ...form, followUpDate: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="aberta">Aberta</SelectItem>
                  <SelectItem value="em-progresso">Em Progresso</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={update.isPending}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
