import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Delegation } from '@/types'
import { useUpdateDelegation, useCreateDelegation } from '@/hooks/useGovernanceData'

interface Props {
  delegation: Delegation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditDelegationDialog({ delegation, open, onOpenChange }: Props) {
  const update = useUpdateDelegation()
  const create = useCreateDelegation()
  const [form, setForm] = useState<Delegation | null>(delegation)
  useEffect(() => { setForm(delegation) }, [delegation])
  if (!form) return null
  const isNew = !form.id

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isNew) await create.mutateAsync(form)
      else await update.mutateAsync(form)
      onOpenChange(false)
    } catch (err) {
      console.error('Falha ao salvar delegação:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isNew ? 'Nova Delegação' : 'Editar Delegação'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Responsável</Label>
            <Input value={form.responsible} onChange={(e) => setForm({ ...form, responsible: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Entrega</Label>
            <Input value={form.deliverable} onChange={(e) => setForm({ ...form, deliverable: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prazo</Label>
              <Input type="date" value={form.dueDate?.slice(0, 10) ?? ''} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Último Update</Label>
              <Input type="date" value={form.lastUpdate?.slice(0, 10) ?? ''} onChange={(e) => setForm({ ...form, lastUpdate: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em-progresso">Em Progresso</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="atrasada">Atrasada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Risco</Label>
              <Select value={form.riskLevel} onValueChange={(v) => setForm({ ...form, riskLevel: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixo">Baixo</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                  <SelectItem value="critico">Crítico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <Input value={form.notes ?? ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={update.isPending || create.isPending}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
