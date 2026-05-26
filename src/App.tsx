import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
import { PreferencesProvider, usePreferences } from '@/contexts/PreferencesContext'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
})

function HomeRoute() {
  const { prefs } = usePreferences()
  if (prefs.homeRoute && prefs.homeRoute !== '/') return <Navigate to={prefs.homeRoute} replace />
  return <AppLayout><Dashboard /></AppLayout>
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PreferencesProvider>
          <Router>
            <Routes>
              <Route element={<HomeRoute />} path="/" />
              <Route element={<AppLayout><Backlog /></AppLayout>} path="/backlog" />
              <Route element={<AppLayout><Delegacoes /></AppLayout>} path="/delegacoes" />
              <Route element={<AppLayout><Riscos /></AppLayout>} path="/riscos" />
              <Route element={<AppLayout><Reunioes /></AppLayout>} path="/reunioes" />
              <Route element={<AppLayout><FollowUps /></AppLayout>} path="/follow-ups" />
              <Route element={<AppLayout><Configuracoes /></AppLayout>} path="/configuracoes" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Router>
        </PreferencesProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
