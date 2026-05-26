import { useState, useEffect } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePreferences } from '@/contexts/PreferencesContext'
import { ProfileDialog } from '@/components/profile/ProfileDialog'
import { PreferencesDialog } from '@/components/profile/PreferencesDialog'
import { NotificationsBell } from '@/components/layout/NotificationsBell'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('')
}

export function Header() {
  const { prefs, reset } = usePreferences()
  const [profileOpen, setProfileOpen] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(i)
  }, [])

  const handleLogout = () => {
    if (window.confirm('Deseja sair e restaurar preferências padrão?')) {
      reset()
      window.location.reload()
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Cockpit de Governança</h2>
          <p className="text-sm text-muted-foreground">
            {now.toLocaleDateString(prefs.dateLocale, { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {prefs.notifications && (
            <Button variant="ghost" size="icon" className="relative" title="Notificações">
              <Bell className="h-5 w-5" />
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {initials(prefs.profile.name) || <User className="h-4 w-4" />}
                </div>
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-sm font-medium">{prefs.profile.name}</span>
                  <span className="text-xs text-muted-foreground">{prefs.profile.role}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-2 py-2">
                <p className="text-sm font-medium">{prefs.profile.name}</p>
                <p className="text-xs text-muted-foreground">{prefs.profile.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setPrefsOpen(true)}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferências</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair / Restaurar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
      <PreferencesDialog open={prefsOpen} onOpenChange={setPrefsOpen} />
    </header>
  )
}
