import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Meeting } from '@/types'
import { useUpdateMeeting } from '@/hooks/useGovernanceData'

interface Props {
  meeting: Meeting | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditMeetingDialog({ meeting, open, onOpenChange }: Props) {
  const update = useUpdateMeeting()
  const [form, setForm] = useState<Meeting | null>(meeting)
  useEffect(() => { setForm(meeting) }, [meeting])
  if (!form) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    await update.mutateAsync(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Editar Reunião</DialogTitle></DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Data</Label>
            <Input type="date" value={form.date?.slice(0, 10) ?? ''} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Participantes (separados por vírgula)</Label>
            <Input
              value={form.participants.join(', ')}
              onChange={(e) => setForm({ ...form, participants: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Decisões (uma por linha)</Label>
            <textarea
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.decisions.join('\n')}
              onChange={(e) => setForm({ ...form, decisions: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) })}
            />
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <textarea
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.notes ?? ''}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
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
