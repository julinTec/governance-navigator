import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSupabase } from '@/lib/supabaseClient'
import type {
  Demand,
  Delegation,
  Risk,
  Meeting,
  FollowUp,
  Workstream,
} from '@/types'

// ---------- Workstreams ----------
export function useWorkstreams() {
  return useQuery({
    queryKey: ['workstreams'],
    queryFn: async (): Promise<Workstream[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('workstreams')
        .select('*')
        .order('name')
      if (error) throw error
      return (data ?? []).map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description ?? undefined,
        color: w.color ?? undefined,
      }))
    },
  })
}

// ---------- Demands ----------
export function useDemands() {
  return useQuery({
    queryKey: ['demands'],
    queryFn: async (): Promise<Demand[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('demands')
        .select('*')
        .order('due_date', { ascending: true })
      if (error) throw error
      return (data ?? []).map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description ?? undefined,
        origin: d.origin ?? '',
        workstream: d.workstream ?? '',
        responsible: d.responsible ?? '',
        priority: d.priority,
        status: d.status,
        dueDate: d.due_date ?? '',
        riskLevel: d.risk_level,
        nextStep: d.next_step ?? undefined,
        createdAt: d.created_at,
        updatedAt: d.updated_at,
      }))
    },
  })
}

export function useUpdateDemand() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (d: Partial<Demand> & { id: string }) => {
      const supabase = await getSupabase()
      const { error } = await supabase
        .from('demands')
        .update({
          title: d.title,
          origin: d.origin,
          workstream: d.workstream,
          responsible: d.responsible,
          priority: d.priority as any,
          status: d.status as any,
          due_date: d.dueDate || null,
          risk_level: d.riskLevel as any,
          next_step: d.nextStep,
        })
        .eq('id', d.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['demands'] }),
  })
}

export function useDeleteDemand() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('demands').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['demands'] }),
  })
}

// ---------- Delegations ----------
export function useDelegations() {
  return useQuery({
    queryKey: ['delegations'],
    queryFn: async (): Promise<Delegation[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('delegations')
        .select('*')
        .order('due_date', { ascending: true })
      if (error) throw error
      return (data ?? []).map((d) => ({
        id: d.id,
        responsible: d.responsible,
        deliverable: d.deliverable,
        dueDate: d.due_date ?? '',
        lastUpdate: d.last_update ?? '',
        status: d.status,
        riskLevel: d.risk_level,
        notes: d.notes ?? undefined,
      }))
    },
  })
}

export function useUpdateDelegation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (d: Partial<Delegation> & { id: string }) => {
      const supabase = await getSupabase()
      const { error } = await supabase
        .from('delegations')
        .update({
          responsible: d.responsible,
          deliverable: d.deliverable,
          due_date: d.dueDate || null,
          last_update: d.lastUpdate || null,
          status: d.status as any,
          risk_level: d.riskLevel as any,
          notes: d.notes,
        })
        .eq('id', d.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['delegations'] }),
  })
}

export function useDeleteDelegation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('delegations').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['delegations'] }),
  })
}

// ---------- Risks ----------
export function useRisks() {
  return useQuery({
    queryKey: ['risks'],
    queryFn: async (): Promise<Risk[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('risks')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []).map((r) => ({
        id: r.id,
        description: r.description,
        impact: r.impact,
        probability: r.probability,
        level: r.level,
        mitigationPlan: r.mitigation_plan ?? '',
        responsible: r.responsible ?? '',
        status: r.status,
        createdAt: r.created_at,
      }))
    },
  })
}

export function useUpdateRisk() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (r: Partial<Risk> & { id: string }) => {
      const supabase = await getSupabase()
      const { error } = await supabase
        .from('risks')
        .update({
          description: r.description,
          impact: r.impact as any,
          probability: r.probability as any,
          level: r.level as any,
          mitigation_plan: r.mitigationPlan,
          responsible: r.responsible,
          status: r.status as any,
        })
        .eq('id', r.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['risks'] }),
  })
}

export function useDeleteRisk() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('risks').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['risks'] }),
  })
}

// ---------- Meetings (with pendencies) ----------
export function useMeetings() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: async (): Promise<Meeting[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('meetings')
        .select('*, pendencies(*)')
        .order('date', { ascending: false })
      if (error) throw error
      return (data ?? []).map((m: any) => ({
        id: m.id,
        title: m.title,
        date: m.date,
        participants: m.participants ?? [],
        decisions: m.decisions ?? [],
        notes: m.notes ?? undefined,
        createdAt: m.created_at,
        pendencies: (m.pendencies ?? []).map((p: any) => ({
          id: p.id,
          description: p.description,
          responsible: p.responsible ?? '',
          dueDate: p.due_date ?? '',
        })),
      }))
    },
  })
}

export function useUpdateMeeting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (m: Partial<Meeting> & { id: string }) => {
      const supabase = await getSupabase()
      const { error } = await supabase
        .from('meetings')
        .update({
          title: m.title,
          date: m.date,
          participants: m.participants,
          decisions: m.decisions,
          notes: m.notes,
        })
        .eq('id', m.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meetings'] }),
  })
}

export function useDeleteMeeting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = await getSupabase()
      await supabase.from('pendencies').delete().eq('meeting_id', id)
      const { error } = await supabase.from('meetings').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meetings'] }),
  })
}

// ---------- Follow-ups ----------
export function useFollowUps() {
  return useQuery({
    queryKey: ['follow_ups'],
    queryFn: async (): Promise<FollowUp[]> => {
      const supabase = await getSupabase()
      const { data, error } = await supabase
        .from('follow_ups')
        .select('*')
        .order('follow_up_date', { ascending: true })
      if (error) throw error
      return (data ?? []).map((f) => ({
        id: f.id,
        person: f.person,
        subject: f.subject,
        lastInteraction: f.last_interaction ?? '',
        nextAction: f.next_action ?? '',
        followUpDate: f.follow_up_date ?? '',
        status: f.status,
        priority: f.priority,
      }))
    },
  })
}

export function useUpdateFollowUp() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (f: Partial<FollowUp> & { id: string }) => {
      const supabase = await getSupabase()
      const { error } = await supabase
        .from('follow_ups')
        .update({
          person: f.person,
          subject: f.subject,
          last_interaction: f.lastInteraction || null,
          next_action: f.nextAction,
          follow_up_date: f.followUpDate || null,
          status: f.status as any,
          priority: f.priority as any,
        })
        .eq('id', f.id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['follow_ups'] }),
  })
}

export function useDeleteFollowUp() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('follow_ups').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['follow_ups'] }),
  })
}

// ---------- Create mutations ----------
export function useCreateDemand() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (d: Partial<Demand>) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('demands').insert({
        title: d.title ?? '',
        origin: d.origin,
        workstream: d.workstream,
        responsible: d.responsible,
        priority: (d.priority ?? 'media') as any,
        status: (d.status ?? 'aberta') as any,
        due_date: d.dueDate || null,
        risk_level: (d.riskLevel ?? 'baixo') as any,
        next_step: d.nextStep,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['demands'] }),
  })
}

export function useCreateDelegation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (d: Partial<Delegation>) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('delegations').insert({
        responsible: d.responsible ?? '',
        deliverable: d.deliverable ?? '',
        due_date: d.dueDate || null,
        last_update: d.lastUpdate || null,
        status: (d.status ?? 'pendente') as any,
        risk_level: (d.riskLevel ?? 'baixo') as any,
        notes: d.notes,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['delegations'] }),
  })
}

export function useCreateRisk() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (r: Partial<Risk>) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('risks').insert({
        description: r.description ?? '',
        impact: (r.impact ?? 'medio') as any,
        probability: (r.probability ?? 'media') as any,
        level: (r.level ?? 'medio') as any,
        mitigation_plan: r.mitigationPlan,
        responsible: r.responsible,
        status: (r.status ?? 'ativo') as any,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['risks'] }),
  })
}

export function useCreateMeeting() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (m: Partial<Meeting>) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('meetings').insert({
        title: m.title ?? '',
        date: m.date ?? new Date().toISOString().slice(0, 10),
        participants: m.participants ?? [],
        decisions: m.decisions ?? [],
        notes: m.notes,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['meetings'] }),
  })
}

export function useCreateFollowUp() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (f: Partial<FollowUp>) => {
      const supabase = await getSupabase()
      const { error } = await supabase.from('follow_ups').insert({
        person: f.person ?? '',
        subject: f.subject ?? '',
        last_interaction: f.lastInteraction || null,
        next_action: f.nextAction,
        follow_up_date: f.followUpDate || null,
        status: (f.status ?? 'aberta') as any,
        priority: (f.priority ?? 'media') as any,
      })
      if (error) throw error
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['follow_ups'] }),
  })
}
