export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      delegations: {
        Row: {
          created_at: string
          deliverable: string
          due_date: string | null
          id: string
          last_update: string | null
          notes: string | null
          responsible: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          status: Database["public"]["Enums"]["delegation_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deliverable: string
          due_date?: string | null
          id?: string
          last_update?: string | null
          notes?: string | null
          responsible: string
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["delegation_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deliverable?: string
          due_date?: string | null
          id?: string
          last_update?: string | null
          notes?: string | null
          responsible?: string
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["delegation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      demands: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          next_step: string | null
          origin: string | null
          priority: Database["public"]["Enums"]["demand_priority"]
          responsible: string | null
          risk_level: Database["public"]["Enums"]["risk_level"]
          status: Database["public"]["Enums"]["demand_status"]
          title: string
          updated_at: string
          workstream: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          next_step?: string | null
          origin?: string | null
          priority?: Database["public"]["Enums"]["demand_priority"]
          responsible?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["demand_status"]
          title: string
          updated_at?: string
          workstream?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          next_step?: string | null
          origin?: string | null
          priority?: Database["public"]["Enums"]["demand_priority"]
          responsible?: string | null
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: Database["public"]["Enums"]["demand_status"]
          title?: string
          updated_at?: string
          workstream?: string | null
        }
        Relationships: []
      }
      follow_ups: {
        Row: {
          created_at: string
          follow_up_date: string | null
          id: string
          last_interaction: string | null
          next_action: string | null
          person: string
          priority: Database["public"]["Enums"]["demand_priority"]
          status: Database["public"]["Enums"]["followup_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          follow_up_date?: string | null
          id?: string
          last_interaction?: string | null
          next_action?: string | null
          person: string
          priority?: Database["public"]["Enums"]["demand_priority"]
          status?: Database["public"]["Enums"]["followup_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          follow_up_date?: string | null
          id?: string
          last_interaction?: string | null
          next_action?: string | null
          person?: string
          priority?: Database["public"]["Enums"]["demand_priority"]
          status?: Database["public"]["Enums"]["followup_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          created_at: string
          date: string
          decisions: string[]
          id: string
          notes: string | null
          participants: string[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          decisions?: string[]
          id?: string
          notes?: string | null
          participants?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          decisions?: string[]
          id?: string
          notes?: string | null
          participants?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pendencies: {
        Row: {
          created_at: string
          description: string
          due_date: string | null
          id: string
          meeting_id: string
          responsible: string | null
        }
        Insert: {
          created_at?: string
          description: string
          due_date?: string | null
          id?: string
          meeting_id: string
          responsible?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          due_date?: string | null
          id?: string
          meeting_id?: string
          responsible?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pendencies_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          department: string | null
          email: string
          id: string
          name: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          department?: string | null
          email: string
          id: string
          name: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          department?: string | null
          email?: string
          id?: string
          name?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      risks: {
        Row: {
          created_at: string
          description: string
          id: string
          impact: Database["public"]["Enums"]["risk_impact"]
          level: Database["public"]["Enums"]["risk_level"]
          mitigation_plan: string | null
          probability: Database["public"]["Enums"]["risk_probability"]
          responsible: string | null
          status: Database["public"]["Enums"]["risk_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          impact?: Database["public"]["Enums"]["risk_impact"]
          level?: Database["public"]["Enums"]["risk_level"]
          mitigation_plan?: string | null
          probability?: Database["public"]["Enums"]["risk_probability"]
          responsible?: string | null
          status?: Database["public"]["Enums"]["risk_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          impact?: Database["public"]["Enums"]["risk_impact"]
          level?: Database["public"]["Enums"]["risk_level"]
          mitigation_plan?: string | null
          probability?: Database["public"]["Enums"]["risk_probability"]
          responsible?: string | null
          status?: Database["public"]["Enums"]["risk_status"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workstreams: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "coordenador" | "user"
      delegation_status: "pendente" | "em-progresso" | "concluida" | "atrasada"
      demand_priority: "baixa" | "media" | "alta" | "critica"
      demand_status:
        | "aberta"
        | "em-progresso"
        | "bloqueada"
        | "concluida"
        | "cancelada"
      followup_status: "aberta" | "em-progresso" | "concluida"
      risk_impact: "baixo" | "medio" | "alto" | "critico"
      risk_level: "baixo" | "medio" | "alto" | "critico"
      risk_probability: "baixa" | "media" | "alta" | "muito-alta"
      risk_status: "ativo" | "mitigado" | "encerrado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "coordenador", "user"],
      delegation_status: ["pendente", "em-progresso", "concluida", "atrasada"],
      demand_priority: ["baixa", "media", "alta", "critica"],
      demand_status: [
        "aberta",
        "em-progresso",
        "bloqueada",
        "concluida",
        "cancelada",
      ],
      followup_status: ["aberta", "em-progresso", "concluida"],
      risk_impact: ["baixo", "medio", "alto", "critico"],
      risk_level: ["baixo", "medio", "alto", "critico"],
      risk_probability: ["baixa", "media", "alta", "muito-alta"],
      risk_status: ["ativo", "mitigado", "encerrado"],
    },
  },
} as const
