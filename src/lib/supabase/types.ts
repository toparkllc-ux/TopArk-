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
      admin_allowlist: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      admins: {
        Row: {
          granted_at: string
          id: string
        }
        Insert: {
          granted_at?: string
          id: string
        }
        Update: {
          granted_at?: string
          id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          detail: string | null
          id: string
          interview_request_id: string | null
          kind: string
          owner_id: string
          starts_at: string
          title: string
        }
        Insert: {
          created_at?: string
          detail?: string | null
          id?: string
          interview_request_id?: string | null
          kind?: string
          owner_id: string
          starts_at: string
          title: string
        }
        Update: {
          created_at?: string
          detail?: string | null
          id?: string
          interview_request_id?: string | null
          kind?: string
          owner_id?: string
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_interview_request_id_fkey"
            columns: ["interview_request_id"]
            isOneToOne: false
            referencedRelation: "interview_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      athlete_profiles: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          forty_yard_dash: number | null
          height_cm: number | null
          highlight_url: string | null
          id: string
          last_name: string
          membership_tier: string
          position: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          verification_status: string
          verification_submitted_at: string | null
          weight_kg: number | null
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          forty_yard_dash?: number | null
          height_cm?: number | null
          highlight_url?: string | null
          id: string
          last_name?: string
          membership_tier?: string
          position?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          verification_status?: string
          verification_submitted_at?: string | null
          weight_kg?: number | null
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          forty_yard_dash?: number | null
          height_cm?: number | null
          highlight_url?: string | null
          id?: string
          last_name?: string
          membership_tier?: string
          position?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          verification_status?: string
          verification_submitted_at?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          room_id: string
          sender_id: string
          sender_name: string
          sender_role: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          room_id: string
          sender_id: string
          sender_name?: string
          sender_role?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          room_id?: string
          sender_id?: string
          sender_name?: string
          sender_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          created_at: string
          id: string
          name: string
          section: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          section: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          section?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      combine_events: {
        Row: {
          capacity: number | null
          created_at: string
          description: string
          event_date: string
          id: string
          location: string
          registration_deadline: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          description: string
          event_date: string
          id?: string
          location: string
          registration_deadline?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          description?: string
          event_date?: string
          id?: string
          location?: string
          registration_deadline?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      combine_registrations: {
        Row: {
          appointment_id: string | null
          athlete_id: string
          created_at: string
          event_id: string
          id: string
        }
        Insert: {
          appointment_id?: string | null
          athlete_id: string
          created_at?: string
          event_id: string
          id?: string
        }
        Update: {
          appointment_id?: string | null
          athlete_id?: string
          created_at?: string
          event_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "combine_registrations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combine_registrations_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combine_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "combine_events"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          last_message_at: string
          team_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          team_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_requests: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          message: string | null
          proposed_at: string | null
          requested_by: string
          scheduled_at: string | null
          status: string
          team_id: string
          updated_at: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          message?: string | null
          proposed_at?: string | null
          requested_by: string
          scheduled_at?: string | null
          status?: string
          team_id: string
          updated_at?: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          message?: string | null
          proposed_at?: string | null
          requested_by?: string
          scheduled_at?: string | null
          status?: string
          team_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_requests_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_requests_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          body: string
          conversation_id: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          body: string
          conversation_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          body?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          excerpt: string
          id: string
          published_at: string | null
          slug: string
          status: string
          tag: string
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          excerpt: string
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          tag?: string
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          excerpt?: string
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          tag?: string
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "news_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string
          created_at: string
          id: string
        }
        Insert: {
          account_type: string
          created_at?: string
          id: string
        }
        Update: {
          account_type?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      signings: {
        Row: {
          athlete_id: string
          created_at: string
          id: string
          notes: string | null
          signed_at: string
          team_id: string
        }
        Insert: {
          athlete_id: string
          created_at?: string
          id?: string
          notes?: string | null
          signed_at?: string
          team_id: string
        }
        Update: {
          athlete_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          signed_at?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signings_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_profiles: {
        Row: {
          bio: string | null
          contact_name: string
          country: string | null
          created_at: string
          email: string
          id: string
          league: string | null
          team_name: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          contact_name?: string
          country?: string | null
          created_at?: string
          email?: string
          id: string
          league?: string | null
          team_name?: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          contact_name?: string
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          league?: string | null
          team_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      athlete_directory: {
        Row: {
          bio: string | null
          country: string | null
          created_at: string | null
          first_name: string | null
          forty_yard_dash: number | null
          height_cm: number | null
          highlight_url: string | null
          id: string | null
          last_name: string | null
          membership_tier: string | null
          position: string | null
          verification_status: string | null
          weight_kg: number | null
        }
        Insert: {
          bio?: string | null
          country?: string | null
          created_at?: string | null
          first_name?: string | null
          forty_yard_dash?: number | null
          height_cm?: number | null
          highlight_url?: string | null
          id?: string | null
          last_name?: string | null
          membership_tier?: string | null
          position?: string | null
          verification_status?: string | null
          weight_kg?: number | null
        }
        Update: {
          bio?: string | null
          country?: string | null
          created_at?: string | null
          first_name?: string | null
          forty_yard_dash?: number | null
          height_cm?: number | null
          highlight_url?: string | null
          id?: string | null
          last_name?: string | null
          membership_tier?: string | null
          position?: string | null
          verification_status?: string | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athlete_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      combine_event_public: {
        Row: {
          capacity: number | null
          description: string | null
          event_date: string | null
          id: string | null
          location: string | null
          registered_count: number | null
          registration_deadline: string | null
          slug: string | null
          status: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      can_use_community_chat: {
        Args: { uid: string }
        Returns: boolean
      }
      cancel_combine_registration: {
        Args: { p_event_id: string }
        Returns: undefined
      }
      claim_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      increment_news_post_views: {
        Args: { post_slug: string }
        Returns: undefined
      }
      is_admin: {
        Args: { uid: string }
        Returns: boolean
      }
      register_for_combine: {
        Args: { p_event_id: string }
        Returns: Database["public"]["Tables"]["combine_registrations"]["Row"]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
