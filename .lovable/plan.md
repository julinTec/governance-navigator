## Objetivo

Adicionar um gráfico donut compacto mostrando a distribuição das demandas por status (Abertas, Em progresso, Concluídas, Bloqueadas, Canceladas) na coluna direita do Dashboard, acima do Mapa de Riscos.

## Mudanças

### 1. Novo componente `src/components/dashboard/DemandsStatusChart.tsx`
- Card com título "Demandas por Status" e contador total no header.
- Donut chart usando `recharts` (`PieChart` + `Pie` com `innerRadius`).
- Recebe `demands: Demand[]` via props e agrupa por `status`.
- Legenda lateral/inferior com contagem e percentual por status.
- Cores via design tokens (HSL semânticos do `index.css`): usar `--primary`, `--muted-foreground`, `--success`/verde, `--destructive`, `--warning` (ou tokens equivalentes já existentes). Sem cores hardcoded.
- Estado vazio: mensagem "Sem demandas cadastradas" quando array vazio.
- Tooltip customizado simples com nome do status + quantidade.

### 2. Editar `src/pages/Dashboard.tsx`
- Importar `DemandsStatusChart`.
- Na coluna direita (`<div className="space-y-6">`), inserir `<DemandsStatusChart demands={mockDemands} />` ANTES de `<RiskRadar />`.

## Detalhes técnicos

- `recharts` já é usado pelo shadcn (`src/components/ui/chart.tsx` provavelmente disponível) — verificar e reutilizar `ChartContainer`/`ChartTooltip` se existir para consistência visual.
- Mapeamento de status → label PT-BR: `aberta`→"Abertas", `em-progresso`→"Em progresso", `concluida`→"Concluídas", `bloqueada`→"Bloqueadas", `cancelada`→"Canceladas".
- Filtrar zeros da legenda para não poluir.
- Altura compacta (~240px) para não desequilibrar a coluna.

## Não incluso
- Sem mudanças no schema, hooks ou lógica de negócio.
- Sem alteração em outros componentes do Dashboard.