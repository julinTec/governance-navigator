import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
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

// ---------- Delegations ----------
export function useDelegations() {
  return useQuery({
    queryKey: ['delegations'],
    queryFn: async (): Promise<Delegation[]> => {
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

// ---------- Risks ----------
export function useRisks() {
  return useQuery({
    queryKey: ['risks'],
    queryFn: async (): Promise<Risk[]> => {
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

// ---------- Meetings (with pendencies) ----------
export function useMeetings() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: async (): Promise<Meeting[]> => {
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

// ---------- Follow-ups ----------
export function useFollowUps() {
  return useQuery({
    queryKey: ['follow_ups'],
    queryFn: async (): Promise<FollowUp[]> => {
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
