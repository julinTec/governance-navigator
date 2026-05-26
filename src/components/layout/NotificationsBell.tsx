import { useEffect, useMemo, useRef } from 'react'
import { Bell } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDemands, useDelegations, useFollowUps } from '@/hooks/useGovernanceData'
import { getDaysUntil, formatDate } from '@/lib/utils'

type Notif = {
  id: string
  source: 'Demanda' | 'Delegação' | 'Follow-up'
  title: string
  dueDate: string
  days: number
}

const URGENT_THRESHOLD = 3

export function NotificationsBell() {
  const { data: demands = [] } = useDemands()
  const { data: delegations = [] } = useDelegations()
  const { data: followUps = [] } = useFollowUps()

  const notifications = useMemo<Notif[]>(() => {
    const list: Notif[] = []

    demands.forEach((d) => {
      if (!d.dueDate || d.status === 'concluida') return
      const days = getDaysUntil(d.dueDate)
      if (days <= URGENT_THRESHOLD) {
        list.push({ id: `demand-${d.id}`, source: 'Demanda', title: d.title, dueDate: d.dueDate, days })
      }
    })

    delegations.forEach((d) => {
      if (!d.dueDate || d.status === 'concluida') return
      const days = getDaysUntil(d.dueDate)
      if (days <= URGENT_THRESHOLD) {
        list.push({ id: `deleg-${d.id}`, source: 'Delegação', title: d.deliverable, dueDate: d.dueDate, days })
      }
    })

    followUps.forEach((f) => {
      if (!f.followUpDate || f.status === 'concluida') return
      const days = getDaysUntil(f.followUpDate)
      if (days <= URGENT_THRESHOLD) {
        list.push({ id: `fu-${f.id}`, source: 'Follow-up', title: f.subject, dueDate: f.followUpDate, days })
      }
    })

    return list.sort((a, b) => a.days - b.days)
  }, [demands, delegations, followUps])

  const overdueCount = notifications.filter((n) => n.days < 0).length
  const total = notifications.length

  // Toast once per new alert
  const seen = useRef<Set<string>>(new Set())
  useEffect(() => {
    notifications.forEach((n) => {
      const key = `${n.id}:${n.days}`
      if (seen.current.has(key)) return
      seen.current.add(key)
      const msg =
        n.days < 0
          ? `Atrasado há ${Math.abs(n.days)} dia(s): ${n.title}`
          : n.days === 0
          ? `Vence hoje: ${n.title}`
          : `Vence em ${n.days} dia(s): ${n.title}`
      if (n.days < 0) toast.error(`[${n.source}] ${msg}`)
      else toast.warning(`[${n.source}] ${msg}`)
    })
  }, [notifications])

  const labelFor = (days: number) =>
    days < 0 ? `Atrasado ${Math.abs(days)}d` : days === 0 ? 'Hoje' : `Em ${days}d`

  const colorFor = (days: number) =>
    days < 0 ? 'text-destructive' : days === 0 ? 'text-orange-600' : 'text-yellow-700'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" title="Notificações">
          <Bell className="h-5 w-5" />
          {total > 0 && (
            <span
              className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1 ${
                overdueCount > 0 ? 'bg-destructive text-destructive-foreground' : 'bg-yellow-500 text-white'
              }`}
            >
              {total}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96">
        <DropdownMenuLabel>
          Notificações {total > 0 && <span className="text-muted-foreground font-normal">({total})</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {total === 0 ? (
          <div className="px-3 py-6 text-sm text-muted-foreground text-center">
            Nenhum prazo próximo ou vencido.
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            <ul className="py-1">
              {notifications.map((n) => (
                <li key={n.id} className="px-3 py-2 hover:bg-muted/50">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{n.source}</p>
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(n.dueDate)}</p>
                    </div>
                    <span className={`text-xs font-semibold whitespace-nowrap ${colorFor(n.days)}`}>
                      {labelFor(n.days)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
