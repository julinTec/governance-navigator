import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePreferences, type Theme, type Density, type DateLocale, type HomeRoute } from '@/contexts/PreferencesContext'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreferencesDialog({ open, onOpenChange }: Props) {
  const { prefs, setPrefs } = usePreferences()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Preferências</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <Select value={prefs.theme} onValueChange={(v) => setPrefs({ theme: v as Theme })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Seguir sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Densidade da interface</Label>
            <Select value={prefs.density} onValueChange={(v) => setPrefs({ density: v as Density })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="comfortable">Confortável</SelectItem>
                <SelectItem value="compact">Compacta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Formato de datas</Label>
            <Select value={prefs.dateLocale} onValueChange={(v) => setPrefs({ dateLocale: v as DateLocale })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil) — 31/12/2025</SelectItem>
                <SelectItem value="en-US">Inglês (EUA) — 12/31/2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Notificações no sino</Label>
            <Select value={prefs.notifications ? 'on' : 'off'} onValueChange={(v) => setPrefs({ notifications: v === 'on' })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="on">Ativadas</SelectItem>
                <SelectItem value="off">Silenciadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Página inicial</Label>
            <Select value={prefs.homeRoute} onValueChange={(v) => setPrefs({ homeRoute: v as HomeRoute })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="/">Dashboard</SelectItem>
                <SelectItem value="/backlog">Backlog</SelectItem>
                <SelectItem value="/delegacoes">Delegações</SelectItem>
                <SelectItem value="/riscos">Riscos</SelectItem>
                <SelectItem value="/reunioes">Reuniões</SelectItem>
                <SelectItem value="/follow-ups">Follow-ups</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Concluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
