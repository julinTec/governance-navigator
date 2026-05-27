## Objetivo
Na tela **Backlog de Demandas**, permitir que o usuário clique em qualquer linha da tabela para abrir o dialog de detalhamento/edição da demanda selecionada.

## Alterações

### 1. `src/pages/Backlog.tsx`
- Adicionar `cursor-pointer` nas linhas (`TableRow`) da lista de demandas.
- Adicionar `onClick` em cada `TableRow` que chama `setEditing(demand)` para abrir o `EditDemandDialog` com os dados da demanda.
- Inserir `e.stopPropagation()` nos handlers de edição e exclusão do `RowActions` para evitar que o clique nos botões de ação dispare o clique da linha.

## Resultado esperado
- O usuário poderá clicar em qualquer demanda listada para visualizar/editar seus detalhes.
- Os botões de "Editar" e "Excluir" no final da linha continuam funcionando normalmente, sem conflito com o clique da linha.
