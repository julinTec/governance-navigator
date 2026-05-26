import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePreferences } from '@/contexts/PreferencesContext'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: Props) {
  const { prefs, setProfile } = usePreferences()
  const [form, setForm] = useState(prefs.profile)
  useEffect(() => { setForm(prefs.profile) }, [prefs.profile, open])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Meu Perfil</DialogTitle></DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Cargo</Label>
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
