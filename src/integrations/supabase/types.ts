export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accepted_applications: {
        Row: {
          acceptance_notes: string | null
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string | null
          ic_name: string
          id: string
          ip_address: string | null
          ooc_age: number | null
          ooc_experience: string | null
          ooc_motivation: string | null
          original_application_id: string
          position_answers: Json | null
          position_type: string
          status: string
          submission_platform: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          acceptance_notes?: string | null
          accepted_at?: string | null
          accepted_by?: string | null
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background?: string | null
          ic_name: string
          id?: string
          ip_address?: string | null
          ooc_age?: number | null
          ooc_experience?: string | null
          ooc_motivation?: string | null
          original_application_id: string
          position_answers?: Json | null
          position_type: string
          status?: string
          submission_platform?: string | null
          updated_at: string
          user_agent?: string | null
        }
        Update: {
          acceptance_notes?: string | null
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          discord_id?: string
          discord_username?: string
          ic_age?: number
          ic_background?: string | null
          ic_name?: string
          id?: string
          ip_address?: string | null
          ooc_age?: number | null
          ooc_experience?: string | null
          ooc_motivation?: string | null
          original_application_id?: string
          position_answers?: Json | null
          position_type?: string
          status?: string
          submission_platform?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accepted_applications_original_application_id_fkey"
            columns: ["original_application_id"]
            isOneToOne: false
            referencedRelation: "application_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accepted_applications_original_application_id_fkey"
            columns: ["original_application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_detection_results: {
        Row: {
          application_id: string
          confidence: string
          details: Json | null
          detected_at: string | null
          id: string
          is_ai_generated: boolean
          score: number
        }
        Insert: {
          application_id: string
          confidence: string
          details?: Json | null
          detected_at?: string | null
          id?: string
          is_ai_generated: boolean
          score: number
        }
        Update: {
          application_id?: string
          confidence?: string
          details?: Json | null
          detected_at?: string | null
          id?: string
          is_ai_generated?: boolean
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_detection_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_detection_results_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_reviews: {
        Row: {
          application_id: string
          created_at: string | null
          id: string
          notes: string | null
          reviewer_id: string
          reviewer_name: string
          status: string
          updated_at: string | null
        }
        Insert: {
          application_id: string
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewer_id: string
          reviewer_name: string
          status: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          reviewer_id?: string
          reviewer_name?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_reviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "application_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_reviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      application_settings: {
        Row: {
          created_at: string | null
          id: number
          setting_name: string
          setting_value: string
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          setting_name: string
          setting_value: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          setting_name?: string
          setting_value?: string
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string
          ic_name: string
          id: string
          ip_address: string | null
          ooc_age: number
          ooc_experience: string
          ooc_motivation: string
          position_answers: Json
          position_type: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submission_platform: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string
          ic_name: string
          id?: string
          ip_address?: string | null
          ooc_age: number
          ooc_experience: string
          ooc_motivation: string
          position_answers: Json
          position_type: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_platform?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          discord_id?: string
          discord_username?: string
          ic_age?: number
          ic_background?: string
          ic_name?: string
          id?: string
          ip_address?: string | null
          ooc_age?: number
          ooc_experience?: string
          ooc_motivation?: string
          position_answers?: Json
          position_type?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submission_platform?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      city_districts: {
        Row: {
          code: string
          coordinates: Json
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          coordinates: Json
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          coordinates?: Json
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      district_alerts: {
        Row: {
          created_at: string
          district_id: string
          id: string
          message: string | null
          threat_code: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id?: string
          message?: string | null
          threat_code: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          message?: string | null
          threat_code?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "district_alerts_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "city_districts"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_by: string | null
          date: string
          description: string
          id: string
          title: string
        }
        Insert: {
          created_by?: string | null
          date: string
          description: string
          id?: string
          title: string
        }
        Update: {
          created_by?: string | null
          date?: string
          description?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      notification_subscriptions: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          keys: Json
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          keys: Json
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          keys?: Json
        }
        Relationships: []
      }
      online_users: {
        Row: {
          first_seen: string | null
          id: string
          ip_address: string | null
          is_admin: boolean | null
          last_seen: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          first_seen?: string | null
          id?: string
          ip_address?: string | null
          is_admin?: boolean | null
          last_seen?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          first_seen?: string | null
          id?: string
          ip_address?: string | null
          is_admin?: boolean | null
          last_seen?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      system_updates: {
        Row: {
          changes: Json
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          update_number: number
          updated_at: string | null
        }
        Insert: {
          changes?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          title: string
          update_number?: number
          updated_at?: string | null
        }
        Update: {
          changes?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_published?: boolean | null
          title?: string
          update_number?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      threat_levels: {
        Row: {
          district: string | null
          expires_at: string | null
          id: string
          message: string | null
          threat_code: Database["public"]["Enums"]["threat_code_enum"]
          updated_at: string
        }
        Insert: {
          district?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          threat_code: Database["public"]["Enums"]["threat_code_enum"]
          updated_at?: string
        }
        Update: {
          district?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          threat_code?: Database["public"]["Enums"]["threat_code_enum"]
          updated_at?: string
        }
        Relationships: []
      }
      threat_recommendations: {
        Row: {
          created_at: string
          description: string
          id: string
          threat_code: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          threat_code: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          threat_code?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          admin_count: number | null
          id: string
          timestamp: string | null
          user_count: number
        }
        Insert: {
          admin_count?: number | null
          id?: string
          timestamp?: string | null
          user_count: number
        }
        Update: {
          admin_count?: number | null
          id?: string
          timestamp?: string | null
          user_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      application_list: {
        Row: {
          created_at: string | null
          discord_username: string | null
          ic_age: number | null
          ic_name: string | null
          id: string | null
          ooc_age: number | null
          position_type: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewer_name: string | null
          status: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      cleanup_inactive_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      delete_system_update: {
        Args: { p_id: string }
        Returns: boolean
      }
      get_accepted_application_by_id: {
        Args: { app_id: string }
        Returns: {
          acceptance_notes: string | null
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string | null
          ic_name: string
          id: string
          ip_address: string | null
          ooc_age: number | null
          ooc_experience: string | null
          ooc_motivation: string | null
          original_application_id: string
          position_answers: Json | null
          position_type: string
          status: string
          submission_platform: string | null
          updated_at: string
          user_agent: string | null
        }[]
      }
      get_accepted_applications: {
        Args: Record<PropertyKey, never>
        Returns: {
          acceptance_notes: string | null
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string | null
          ic_name: string
          id: string
          ip_address: string | null
          ooc_age: number | null
          ooc_experience: string | null
          ooc_motivation: string | null
          original_application_id: string
          position_answers: Json | null
          position_type: string
          status: string
          submission_platform: string | null
          updated_at: string
          user_agent: string | null
        }[]
      }
      insert_system_update: {
        Args: {
          p_title: string
          p_description?: string
          p_changes?: Json
          p_is_published?: boolean
        }
        Returns: {
          changes: Json
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          update_number: number
          updated_at: string | null
        }
      }
      insert_threat_level: {
        Args: {
          p_threat_code: string
          p_message: string
          p_district: string
          p_expires_at: string
        }
        Returns: Json
      }
      record_user_analytics: {
        Args: Record<PropertyKey, never>
        Returns: {
          admin_count: number | null
          id: string
          timestamp: string | null
          user_count: number
        }
      }
      refresh_schema_cache: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      remove_user_session: {
        Args: { p_session_id: string }
        Returns: boolean
      }
      review_application: {
        Args: {
          p_application_id: string
          p_reviewer_id: string
          p_reviewer_name: string
          p_status: string
          p_notes?: string
        }
        Returns: boolean
      }
      send_discord_notification: {
        Args: {
          p_webhook_url: string
          p_application_id: string
          p_status: string
          p_reviewer_name: string
          p_notes?: string
        }
        Returns: undefined
      }
      submit_application: {
        Args: {
          p_position_type: string
          p_discord_id: string
          p_discord_username: string
          p_ic_name: string
          p_ic_age: number
          p_ic_background: string
          p_ooc_age: number
          p_ooc_experience: string
          p_ooc_motivation: string
          p_position_answers: Json
          p_ip_address: string
          p_user_agent: string
          p_submission_platform: string
        }
        Returns: string
      }
      update_application_status: {
        Args: { app_id: string; new_status: string; notes?: string }
        Returns: {
          created_at: string
          discord_id: string
          discord_username: string
          ic_age: number
          ic_background: string
          ic_name: string
          id: string
          ip_address: string | null
          ooc_age: number
          ooc_experience: string
          ooc_motivation: string
          position_answers: Json
          position_type: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submission_platform: string | null
          updated_at: string
          user_agent: string | null
        }[]
      }
      update_system_update: {
        Args: {
          p_id: string
          p_title?: string
          p_description?: string
          p_changes?: Json
          p_is_published?: boolean
        }
        Returns: {
          changes: Json
          created_at: string | null
          description: string | null
          id: string
          is_published: boolean | null
          title: string
          update_number: number
          updated_at: string | null
        }
      }
      update_user_presence: {
        Args: {
          p_session_id: string
          p_user_agent?: string
          p_ip_address?: string
          p_is_admin?: boolean
        }
        Returns: {
          first_seen: string | null
          id: string
          ip_address: string | null
          is_admin: boolean | null
          last_seen: string | null
          session_id: string
          user_agent: string | null
        }
      }
    }
    Enums: {
      threat_code_enum: "green" | "orange" | "red" | "black" | "emergency"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      threat_code_enum: ["green", "orange", "red", "black", "emergency"],
    },
  },
} as const
