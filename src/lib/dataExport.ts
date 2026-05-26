import { getSupabase } from './supabaseClient'

const TABLES = ['workstreams', 'demands', 'delegations', 'risks', 'meetings', 'pendencies', 'follow_ups'] as const

export async function exportAllData() {
  const supabase = await getSupabase()
  const out: Record<string, unknown[]> = {}
  for (const t of TABLES) {
    const { data, error } = await supabase.from(t).select('*')
    if (error) throw error
    out[t] = data ?? []
  }
  const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `cockpit-export-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importAllData(file: File) {
  const text = await file.text()
  const parsed = JSON.parse(text) as Record<string, unknown[]>
  const supabase = await getSupabase()
  for (const t of TABLES) {
    const rows = parsed[t]
    if (!Array.isArray(rows) || rows.length === 0) continue
    const { error } = await supabase.from(t).insert(rows as never)
    if (error) throw new Error(`${t}: ${error.message}`)
  }
}

export async function clearAllData() {
  const supabase = await getSupabase()
  for (const t of ['pendencies', 'meetings', 'follow_ups', 'risks', 'delegations', 'demands'] as const) {
    const { error } = await supabase.from(t).delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (error) throw error
  }
}

export async function seedDemoData() {
  const supabase = await getSupabase()
  const today = new Date()
  const addDays = (n: number) => new Date(today.getTime() + n * 86400000).toISOString().slice(0, 10)

  await supabase.from('demands').insert([
    { title: 'Revisão do Plano Estratégico 2026', origin: 'Presidência', workstream: 'Governança', responsible: 'Julio Cezar', priority: 'alta', status: 'em-progresso', due_date: addDays(7), risk_level: 'medio', next_step: 'Consolidar feedback das áreas' },
    { title: 'Implantar painel de indicadores', origin: 'CGE', workstream: 'Tecnologia', responsible: 'Equipe TI', priority: 'media', status: 'aberta', due_date: addDays(21), risk_level: 'baixo' },
    { title: 'Plano de contingência fiscal', origin: 'Gabinete', workstream: 'Finanças', responsible: 'Diretoria', priority: 'critica', status: 'aberta', due_date: addDays(3), risk_level: 'alto', next_step: 'Reunião extraordinária' },
  ] as never)

  await supabase.from('delegations').insert([
    { responsible: 'Maria Souza', deliverable: 'Relatório quadrimestral', due_date: addDays(10), last_update: addDays(-2), status: 'em-progresso', risk_level: 'medio', notes: 'Aguardando dados da SEFIN' },
    { responsible: 'Carlos Lima', deliverable: 'Mapeamento de processos críticos', due_date: addDays(14), status: 'pendente', risk_level: 'baixo' },
  ] as never)

  await supabase.from('risks').insert([
    { description: 'Atraso na entrega da consultoria externa', impact: 'alto', probability: 'media', level: 'alto', mitigation_plan: 'Acionar fornecedor alternativo', responsible: 'PMO', status: 'ativo' },
    { description: 'Resistência interna à mudança de processo', impact: 'medio', probability: 'alta', level: 'alto', mitigation_plan: 'Treinamento e comunicação', responsible: 'RH', status: 'ativo' },
  ] as never)

  const { data: meeting } = await supabase.from('meetings').insert({
    title: 'Comitê de Governança — Reunião Mensal',
    date: addDays(2),
    participants: ['Julio Cezar', 'Maria Souza', 'Carlos Lima'],
    decisions: ['Aprovar revisão do plano estratégico', 'Priorizar painel de indicadores'],
    notes: 'Próxima reunião em 30 dias.',
  } as never).select().single()

  if (meeting) {
    await supabase.from('pendencies').insert([
      { meeting_id: meeting.id, description: 'Enviar ata para diretoria', responsible: 'Secretaria', due_date: addDays(3) },
    ] as never)
  }

  await supabase.from('follow_ups').insert([
    { person: 'Ana Costa', subject: 'Validação do relatório quadrimestral', last_interaction: addDays(-1), next_action: 'Reenviar e-mail com checklist', follow_up_date: addDays(4), status: 'aberta', priority: 'alta' },
    { person: 'Pedro Mendes', subject: 'Confirmação de participação no comitê', next_action: 'Ligar', follow_up_date: addDays(1), status: 'em-progresso', priority: 'media' },
  ] as never)
}
