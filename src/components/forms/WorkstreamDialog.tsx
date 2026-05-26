import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateWorkstream } from '@/hooks/useGovernanceData'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const COLORS = [
  { value: 'bg-blue-500', label: 'Azul' },
  { value: 'bg-green-500', label: 'Verde' },
  { value: 'bg-amber-500', label: 'Âmbar' },
  { value: 'bg-red-500', label: 'Vermelho' },
  { value: 'bg-purple-500', label: 'Roxo' },
  { value: 'bg-slate-500', label: 'Cinza' },
]

export function WorkstreamDialog({ open, onOpenChange }: Props) {
  const create = useCreateWorkstream()
  const [form, setForm] = useState({ name: '', description: '', color: 'bg-blue-500' })
  useEffect(() => { if (!open) setForm({ name: '', description: '', color: 'bg-blue-500' }) }, [open])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await create.mutateAsync(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Nova Frente de Trabalho</DialogTitle></DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Cor</Label>
            <Select value={form.color} onValueChange={(v) => setForm({ ...form, color: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {COLORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    <span className="inline-flex items-center gap-2">
                      <span className={`inline-block w-3 h-3 rounded ${c.value}`} />
                      {c.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={create.isPending}>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
