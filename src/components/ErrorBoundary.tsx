import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro não tratado na interface:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-background text-foreground">
          <section className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="rounded-md border border-border bg-card p-6 shadow-sm">
              <h1 className="text-2xl font-bold">Não foi possível carregar o app</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Ocorreu um erro inesperado ao abrir a interface. Recarregue a página para tentar novamente.
              </p>
              {import.meta.env.DEV && this.state.error ? (
                <pre className="mt-4 max-h-56 overflow-auto rounded-md bg-muted p-3 text-left text-xs text-muted-foreground">
                  {this.state.error.stack ?? this.state.error.message}
                </pre>
              ) : null}
              <button
                className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                type="button"
                onClick={() => window.location.reload()}
              >
                Recarregar
              </button>
            </div>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}