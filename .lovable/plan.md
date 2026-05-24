
# Ativar Lovable Cloud e migrar persistência

## Objetivo
Substituir `src/data/mockData.ts` por persistência real via Lovable Cloud (Supabase), mantendo 100% da UI atual funcionando. Nenhuma página, componente ou rota será recriada.

## Etapas

### 1. Provisionar Lovable Cloud
- Ativar a integração (cria projeto Supabase gerenciado).
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` ficam disponíveis automaticamente.
- Ajustar `src/lib/supabaseClient.ts` para usar as novas variáveis (o arquivo atual usa `VITE_SUPABASE_ANON_KEY` legado).

### 2. Criar schema (migration)
Tabelas espelhando os tipos em `src/types/index.ts`:

- `workstreams` (id, name, description, color)
- `profiles` (id ↔ auth.users, name, email, role, department, avatar)
- `demands` (campos do tipo `Demand`)
- `delegations` (campos do tipo `Delegation`)
- `risks` (campos do tipo `Risk`)
- `meetings` + `pendencies` (1:N)
- `follow_ups`

Enums Postgres para `demand_status`, `demand_priority`, `risk_level`, `delegation_status`, `meeting_status`, `followup_status`.

### 3. RLS
- RLS habilitada em todas as tabelas.
- Política inicial: **leitura para qualquer authenticated user**, escrita restrita ao próprio `responsible`/`user_id` ou a admins.
- Tabela `user_roles` separada + enum `app_role` (`admin`, `coordenador`, `user`) seguindo o padrão recomendado (sem armazenar role em profiles).
- Função `has_role(uuid, app_role)` SECURITY DEFINER para uso nas policies.

### 4. Seed de dados
- Inserir os registros atuais de `mockData.ts` como seed inicial, para a UI continuar exibindo conteúdo equivalente após a migração.

### 5. Camada de dados no frontend
- Instalar/usar `@tanstack/react-query` (README já o menciona como "preparado").
- Criar `src/hooks/` com: `useDemands`, `useDelegations`, `useRisks`, `useMeetings`, `useFollowUps`, `useWorkstreams`.
- Adaptar `Dashboard`, `Backlog`, `Delegacoes`, `Riscos`, `Reunioes`, `FollowUps`, `Configuracoes` para consumir os hooks ao invés de `mockData`.
- `mockData.ts` permanece temporariamente como fallback até validar a migração; removido depois.

### 6. O que NÃO será feito agora
- Autenticação (telas de login/signup) — fica para o próximo passo.
- CRUD completo dos formulários — `DemandForm`, `DelegationForm`, `MeetingForm` continuam abrindo modal mas a persistência de escrita virá no passo seguinte. Esta entrega foca em **leitura real + base de schema**.
- Remoção da pasta `manager-governanca/` (lixo de template) — pode ser feita junto se você quiser.

## Detalhes técnicos
- Migrations via tool de migração do Cloud (schema only).
- Seed via insert tool após criação das tabelas.
- Sem novos componentes UI; apenas hooks e ajuste de imports.
- Padrão visual institucional preservado (nenhuma mudança em `index.css` ou `tailwind.config.ts`).

## Pergunta antes de implementar
Quer que eu **inclua autenticação básica (email/senha + Google) já nesta entrega** ou prefere manter o app aberto (leitura para todos) e tratar auth em seguida?

