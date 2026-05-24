# Cockpit de Governança

Uma aplicação moderna e responsiva para coordenação, acompanhamento e gestão integrada de demandas, riscos, reuniões e delegações em ambientes de governança institucional.

## 🎯 Funcionalidades

- **Dashboard**: Visualização de KPIs, prioridades do dia, mapa de riscos e resumo semanal
- **Backlog**: Gestão completa de demandas com filtros por status, prioridade e responsável
- **Delegações**: Acompanhamento de entregas delegadas com destaque para itens atrasados
- **Riscos**: Cadastro e acompanhamento de riscos com análise de impacto e probabilidade
- **Reuniões**: Registro de reuniões com decisões, pendências e participantes
- **Follow-ups**: Gestão de cobranças e acompanhamentos com priorização
- **Configurações**: Gerenciamento de frentes, responsáveis, prioridades e status

## 🚀 Stack Tecnológico

- **React 18**: Biblioteca de UI moderna e performática
- **TypeScript**: Tipagem estática para maior segurança
- **Vite**: Build tool rápido e eficiente
- **React Router 6**: Navegação entre páginas
- **Tailwind CSS**: Framework CSS utility-first
- **shadcn/ui**: Componentes de UI reutilizáveis
- **Radix UI**: Primitivos de UI acessíveis
- **lucide-react**: Ícones SVG
- **TanStack Query**: Gerenciamento de estado e dados (preparado)
- **Supabase**: Backend preparado (opcional)

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

## 🔧 Instalação

1. **Clone o repositório**:
```bash
git clone <seu-repositorio>
cd cockpit-governanca
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure as variáveis de ambiente** (opcional):
```bash
cp .env.example .env.local
```

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

A aplicação será aberta em `http://localhost:5173`

## 📦 Estrutura do Projeto

```
src/
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx      # Sidebar com navegação
│   │   ├── Header.tsx          # Header com informações do usuário
│   │   └── AppLayout.tsx       # Layout principal da aplicação
│   ├── dashboard/
│   │   ├── KpiCard.tsx         # Cards de KPI
│   │   ├── PriorityBoard.tsx   # Prioridades do dia
│   │   ├── RiskRadar.tsx       # Mapa visual de riscos
│   │   └── WeeklySummary.tsx   # Resumo semanal
│   ├── forms/
│   │   ├── DemandForm.tsx      # Formulário de demanda
│   │   ├── DelegationForm.tsx  # Formulário de delegação
│   │   └── MeetingForm.tsx     # Formulário de reunião
│   └── ui/
│       ├── button.tsx          # Componente Button
│       ├── card.tsx            # Componente Card
│       ├── badge.tsx           # Componente Badge
│       ├── table.tsx           # Componente Table
│       ├── input.tsx           # Componente Input
│       ├── label.tsx           # Componente Label
│       ├── select.tsx          # Componente Select
│       ├── dialog.tsx          # Componente Dialog
│       ├── dropdown-menu.tsx   # Componente Dropdown Menu
│       ├── tabs.tsx            # Componente Tabs
│       ├── sheet.tsx           # Componente Sheet (mobile)
│       ├── separator.tsx       # Componente Separator
│       └── scroll-area.tsx     # Componente ScrollArea
├── pages/
│   ├── Dashboard.tsx           # Página principal
│   ├── Backlog.tsx             # Página de backlog
│   ├── Delegacoes.tsx          # Página de delegações
│   ├── Riscos.tsx              # Página de riscos
│   ├── Reunioes.tsx            # Página de reuniões
│   ├── FollowUps.tsx           # Página de follow-ups
│   ├── Configuracoes.tsx       # Página de configurações
│   └── NotFound.tsx            # Página 404
├── types/
│   └── index.ts                # Tipos TypeScript
├── data/
│   └── mockData.ts             # Dados mockados
├── lib/
│   ├── utils.ts                # Funções utilitárias
│   └── supabaseClient.ts       # Cliente Supabase
├── App.tsx                     # Componente principal
├── main.tsx                    # Ponto de entrada
└── index.css                   # Estilos globais
```

## 📝 Tipos Principais

### Demand
```typescript
interface Demand {
  id: string
  title: string
  origin: string
  workstream: string
  responsible: string
  priority: 'baixa' | 'media' | 'alta' | 'critica'
  status: 'aberta' | 'em-progresso' | 'bloqueada' | 'concluida'
  dueDate: string
  riskLevel: 'baixo' | 'medio' | 'alto' | 'critico'
  nextStep?: string
}
```

### Risk
```typescript
interface Risk {
  id: string
  description: string
  impact: 'baixo' | 'medio' | 'alto' | 'critico'
  probability: 'baixa' | 'media' | 'alta' | 'muito-alta'
  level: 'baixo' | 'medio' | 'alto' | 'critico'
  mitigationPlan: string
  responsible: string
  status: 'ativo' | 'mitigado' | 'encerrado'
}
```

## 🎨 Personalização

### Cores e Temas

As cores são definidas em `src/index.css` usando variáveis CSS. Para customizar:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: ...
  /* ajuste as variáveis conforme necessário */
}
```

### Adicionar Nova Página

1. Crie um novo arquivo em `src/pages/`
2. Exporte um componente funcional
3. Adicione a rota em `src/App.tsx`
4. Adicione o item de navegação em `src/components/layout/AppSidebar.tsx`

## 🔗 Conectar Supabase

Para conectar um banco de dados real:

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Copie sua URL e chave anônima
3. Adicione ao arquivo `.env.local`:
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```
4. Implemente queries em `src/lib/supabaseClient.ts`

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

## 🚀 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🎓 Próximos Passos

- [ ] Conectar com banco de dados Supabase
- [ ] Implementar autenticação
- [ ] Adicionar exportação para PDF/Excel
- [ ] Implementar notificações em tempo real
- [ ] Adicionar gráficos avançados com Recharts
- [ ] Criar sistema de templates de demandas
- [ ] Implementar webhooks para integrações
- [ ] Adicionar suporte offline com Service Workers

## 📄 Licença

Este projeto está sob licença MIT.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para questões ou problemas:
- Abra uma issue no repositório
- Entre em contato com a equipe de desenvolvimento

---

Desenvolvido com ❤️ para Governança Institucional
