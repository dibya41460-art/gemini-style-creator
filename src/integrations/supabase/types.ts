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
      ai_product_generations: {
        Row: {
          category: string
          created_at: string
          details: Json
          id: string
          price: string | null
          product_name: string
          source_image_url: string | null
          target_region: string | null
          tone: string
        }
        Insert: {
          category?: string
          created_at?: string
          details?: Json
          id?: string
          price?: string | null
          product_name: string
          source_image_url?: string | null
          target_region?: string | null
          tone?: string
        }
        Update: {
          category?: string
          created_at?: string
          details?: Json
          id?: string
          price?: string | null
          product_name?: string
          source_image_url?: string | null
          target_region?: string | null
          tone?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          cancel_token: string
          cancellation_reason: string | null
          cancelled_at: string | null
          created_at: string
          id: string
          is_read: boolean
          name: string
          notes: string | null
          phone: string
          product_name: string | null
          reference: string
          status: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          cancel_token?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          name: string
          notes?: string | null
          phone: string
          product_name?: string | null
          reference: string
          status?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          cancel_token?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          name?: string
          notes?: string | null
          phone?: string
          product_name?: string | null
          reference?: string
          status?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          session_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          session_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      complaints: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          name: string | null
          phone: string
          reason: string
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone: string
          reason: string
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          name?: string | null
          phone?: string
          reason?: string
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      custom_products: {
        Row: {
          carat: string | null
          category: string
          certification: string | null
          clarity: string | null
          craftsmanship: string | null
          created_at: string
          delivery_time: string | null
          description: string | null
          id: string
          image: string
          material: string | null
          name: string
          origin: string | null
          price: string
          purity: string | null
          sku: string | null
          sort_order: number
          tag: string | null
          updated_at: string
          weight: string | null
        }
        Insert: {
          carat?: string | null
          category?: string
          certification?: string | null
          clarity?: string | null
          craftsmanship?: string | null
          created_at?: string
          delivery_time?: string | null
          description?: string | null
          id?: string
          image: string
          material?: string | null
          name: string
          origin?: string | null
          price: string
          purity?: string | null
          sku?: string | null
          sort_order?: number
          tag?: string | null
          updated_at?: string
          weight?: string | null
        }
        Update: {
          carat?: string | null
          category?: string
          certification?: string | null
          clarity?: string | null
          craftsmanship?: string | null
          created_at?: string
          delivery_time?: string | null
          description?: string | null
          id?: string
          image?: string
          material?: string | null
          name?: string
          origin?: string | null
          price?: string
          purity?: string | null
          sku?: string | null
          sort_order?: number
          tag?: string | null
          updated_at?: string
          weight?: string | null
        }
        Relationships: []
      }
      deleted_products: {
        Row: {
          deleted_at: string
          product_id: string
        }
        Insert: {
          deleted_at?: string
          product_id: string
        }
        Update: {
          deleted_at?: string
          product_id?: string
        }
        Relationships: []
      }
      gold_rates: {
        Row: {
          currency: string
          fetched_at: string
          id: string
          rate_per_gram: number
          rate_per_vori: number | null
          source: string
          updated_at: string
        }
        Insert: {
          currency?: string
          fetched_at?: string
          id?: string
          rate_per_gram: number
          rate_per_vori?: number | null
          source?: string
          updated_at?: string
        }
        Update: {
          currency?: string
          fetched_at?: string
          id?: string
          rate_per_gram?: number
          rate_per_vori?: number | null
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_overrides: {
        Row: {
          carat_override: string | null
          certification_override: string | null
          clarity_override: string | null
          craftsmanship_override: string | null
          delivery_time_override: string | null
          description_override: string | null
          image_url: string | null
          material_override: string | null
          name_override: string | null
          origin_override: string | null
          price_override: string | null
          product_id: string
          purity_override: string | null
          updated_at: string
          weight_override: string | null
        }
        Insert: {
          carat_override?: string | null
          certification_override?: string | null
          clarity_override?: string | null
          craftsmanship_override?: string | null
          delivery_time_override?: string | null
          description_override?: string | null
          image_url?: string | null
          material_override?: string | null
          name_override?: string | null
          origin_override?: string | null
          price_override?: string | null
          product_id: string
          purity_override?: string | null
          updated_at?: string
          weight_override?: string | null
        }
        Update: {
          carat_override?: string | null
          certification_override?: string | null
          clarity_override?: string | null
          craftsmanship_override?: string | null
          delivery_time_override?: string | null
          description_override?: string | null
          image_url?: string | null
          material_override?: string | null
          name_override?: string | null
          origin_override?: string | null
          price_override?: string | null
          product_id?: string
          purity_override?: string | null
          updated_at?: string
          weight_override?: string | null
        }
        Relationships: []
      }
      shop_settings: {
        Row: {
          address: string
          address_short: string
          email: string
          footer_about: string
          hero_headline: string | null
          hero_subheading: string | null
          hours: string
          id: string
          logo_url: string | null
          phone: string
          phone_tel: string
          shop_name: string
          shop_tagline: string
          theme_accent: string | null
          theme_background: string | null
          theme_primary: string | null
          updated_at: string
          whatsapp: string
        }
        Insert: {
          address?: string
          address_short?: string
          email?: string
          footer_about?: string
          hero_headline?: string | null
          hero_subheading?: string | null
          hours?: string
          id?: string
          logo_url?: string | null
          phone?: string
          phone_tel?: string
          shop_name?: string
          shop_tagline?: string
          theme_accent?: string | null
          theme_background?: string | null
          theme_primary?: string | null
          updated_at?: string
          whatsapp?: string
        }
        Update: {
          address?: string
          address_short?: string
          email?: string
          footer_about?: string
          hero_headline?: string | null
          hero_subheading?: string | null
          hours?: string
          id?: string
          logo_url?: string | null
          phone?: string
          phone_tel?: string
          shop_name?: string
          shop_tagline?: string
          theme_accent?: string | null
          theme_background?: string | null
          theme_primary?: string | null
          updated_at?: string
          whatsapp?: string
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
          role?: Database["public"]["Enums"]["app_role"]
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
