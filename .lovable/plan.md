## Diagnóstico

A imagem é do **app publicado** (`tjce-manager.lovable.app`). O que ela mostra:

1. **KPIs zerados, "Nenhuma demanda prioritária", Mapa de Riscos = 0** → não é bug: o banco realmente está vazio (nenhum registro nas tabelas `demands`, `delegations`, `risks`, `meetings`, `follow_ups`). Verificável via leitura direta do banco.
2. **Botões "não funcionam" no publicado** → as correções recentes (ErrorBoundary, conexão dos botões aos dialogs, hooks `useCreate*`, lazy load do Supabase) **só existem na versão de preview**. O bundle publicado está congelado em uma versão antiga. Mudanças de frontend **não sobem automaticamente** — só com clique em **Update** no diálogo de publicação. Confirmado pela conversa anterior.
3. **Header com ícone genérico de usuário** mostrando "Ana Silva" hardcoded (de mock). Você quer "Julio Cezar".
4. **Preferências** abrem um item de menu vazio, sem ação.

## Plano de ajustes

### 1. Header — perfil "Julio Cezar" + Preferências funcionais
- Em `src/components/layout/Header.tsx`:
  - Trocar nome para **Julio Cezar** e email para algo coerente (`julio.cezar@tjce.jus.br`).
  - Mostrar iniciais "JC" em um avatar circular ao invés do ícone genérico.
  - Item "Meu Perfil" → abre dialog com nome/email/cargo editáveis (persistido em `localStorage`).
  - Item "Preferências" → abre dialog com opções reais e funcionais:
    - **Tema**: Claro / Escuro / Sistema (aplica via classe `dark` no `<html>`).
    - **Densidade da interface**: Confortável / Compacta (ajusta padding global via classe).
    - **Idioma de datas**: pt-BR / en-US (usado em formatadores).
    - **Notificações no sino**: ligado/desligado.
    - **Página inicial padrão**: Dashboard / Backlog / Delegações / Riscos.
  - Persistência via `localStorage` num provider `PreferencesProvider` aplicado no `App.tsx`.
  - Botão "Sair" → limpa preferências locais e recarrega (não há auth real ainda).

### 2. Garantir que o app seja realmente 100% funcional
- **Auditar todos os botões "Plus / Nova *"** nas páginas Backlog, Delegações, Riscos, Reuniões, Follow-ups e Configurações para garantir que abrem o dialog correto e disparam `useCreate*`. (Já estavam conectados na rodada anterior; revalidar Configurações que ainda tem botões sem handler — "Nova Frente", "Novo Usuário", etc.)
- **Configurações → tornar funcional o que faltar**:
  - "Nova Frente" → dialog que cria registro em `workstreams` (insert real).
  - Botão lixeira em workstreams → delete real com confirmação.
  - Os blocos "Prioridades / Status / Níveis de Risco" são valores de enum fixos no schema; vamos transformá-los em **somente leitura** (remover botões Plus/Trash que enganam o usuário) com um aviso "Definidos pelo sistema".
  - Botões "Exportar Dados" / "Importar Dados" → exportar JSON real de todas as tabelas; importar fará insert em lote.
  - "Limpar Todos os Dados" → confirm + delete em cascata das tabelas operacionais.
- **Popular dados de exemplo (opcional, recomendado)**: botão "Carregar dados de demonstração" em Configurações que insere um pacote de seed (3 demandas, 2 delegações, 2 riscos, 1 reunião, 2 follow-ups) para o usuário ver o app "vivo" assim que abrir. Isso resolve a percepção de "tudo zerado".

### 3. Publicar
- Após as mudanças, lembrar você de clicar em **Update** no diálogo de Publish para o bundle ir ao ar — esse é o passo que explica "aqui funciona, no publicado não".

## Detalhes técnicos

- Novo arquivo `src/contexts/PreferencesContext.tsx` com `usePreferences()` lendo/gravando `localStorage` chave `cockpit:prefs`. Tema aplicado com `document.documentElement.classList.toggle('dark', ...)`.
- Novos dialogs: `src/components/profile/ProfileDialog.tsx`, `src/components/profile/PreferencesDialog.tsx`.
- Novo dialog `src/components/forms/WorkstreamDialog.tsx` + hooks `useCreateWorkstream`, `useDeleteWorkstream` em `useGovernanceData.ts`.
- Função `exportAllData()` em `src/lib/dataExport.ts` chamando `supabase.from(...).select('*')` para cada tabela e fazendo download de `.json`. `importAllData(file)` faz o inverso.
- `Home` padrão configurável: lido pelo `Index`/`App.tsx` para `<Navigate>` ao abrir `/` quando a preferência não for "Dashboard".

## O que NÃO está no escopo

- Autenticação real (login/logout, vínculo com `auth.users`). Hoje as tabelas estão com RLS pública (escolha sua anterior); o "perfil" é apenas local.
- Mudar o schema do banco (enums, novas tabelas além de seed).
