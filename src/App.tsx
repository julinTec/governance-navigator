import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppLayout } from '@/components/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { Backlog } from '@/pages/Backlog'
import { Delegacoes } from '@/pages/Delegacoes'
import { Riscos } from '@/pages/Riscos'
import { Reunioes } from '@/pages/Reunioes'
import { FollowUps } from '@/pages/FollowUps'
import { Configuracoes } from '@/pages/Configuracoes'
import { NotFound } from '@/pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
})

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<AppLayout><Dashboard /></AppLayout>} path="/" />
            <Route element={<AppLayout><Backlog /></AppLayout>} path="/backlog" />
            <Route element={<AppLayout><Delegacoes /></AppLayout>} path="/delegacoes" />
            <Route element={<AppLayout><Riscos /></AppLayout>} path="/riscos" />
            <Route element={<AppLayout><Reunioes /></AppLayout>} path="/reunioes" />
            <Route element={<AppLayout><FollowUps /></AppLayout>} path="/follow-ups" />
            <Route element={<AppLayout><Configuracoes /></AppLayout>} path="/configuracoes" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
