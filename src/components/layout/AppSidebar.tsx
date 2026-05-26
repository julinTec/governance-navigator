import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ListTodo,
  Users,
  AlertTriangle,
  Calendar,
  CheckSquare,
  FolderOpen,
  Settings,
  Menu,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'


const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/backlog', icon: ListTodo, label: 'Backlog' },
  { href: '/delegacoes', icon: Users, label: 'Delegações' },
  { href: '/riscos', icon: AlertTriangle, label: 'Riscos' },
  { href: '/reunioes', icon: Calendar, label: 'Reuniões' },
  { href: '/follow-ups', icon: CheckSquare, label: 'Follow-ups' },
  { href: '/materiais', icon: FolderOpen, label: 'Materiais' },
  { href: '/configuracoes', icon: Settings, label: 'Configurações' },
]

function NavContent() {
  const location = useLocation()

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.href
        return (
          <Link key={item.href} to={item.href}>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              className="w-full justify-start gap-3"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}

export function AppSidebar() {


  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-card lg:block">
        <div className="flex flex-col h-screen">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">Cockpit</h1>
            <p className="text-xs text-muted-foreground">Governança</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4">
              <NavContent />
            </div>
          </ScrollArea>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border">
              <h1 className="text-xl font-bold text-foreground">Cockpit</h1>
              <p className="text-xs text-muted-foreground">Governança</p>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <NavContent />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
