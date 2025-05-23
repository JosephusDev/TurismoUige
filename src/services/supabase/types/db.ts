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
      event: {
        Row: {
          address: string
          created_at: string
          date: string
          description: string
          id: string
          title: string
        }
        Insert: {
          address: string
          created_at?: string
          date: string
          description: string
          id?: string
          title: string
        }
        Update: {
          address?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          id: number
          locate_id: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          locate_id?: string
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          locate_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_locate_id_fkey"
            columns: ["locate_id"]
            isOneToOne: false
            referencedRelation: "locate"
            referencedColumns: ["id"]
          },
        ]
      }
      locate: {
        Row: {
          address: string | null
          category: Database["public"]["Enums"]["category"] | null
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          address?: string | null
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          address?: string | null
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      rate: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          locate_id: string
          value: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          locate_id?: string
          value: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          locate_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "rate_locate_id_fkey"
            columns: ["locate_id"]
            isOneToOne: false
            referencedRelation: "locate"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_locate_details: {
        Args: { _locate_id: string }
        Returns: {
          id: string
          name: string
          description: string
          category: string
          address: string
          created_at: string
          average_rating: number
          total_rates: number
        }[]
      }
      get_locates_by_greatest_rate: {
        Args: Record<PropertyKey, never> | { locate_id: string }
        Returns: {
          id: string
          name: string
          description: string
          category: string
          address: string
          url: string
          created_at: string
          average_rating: number
          total_rates: number
        }[]
      }
      get_locates_by_rate: {
        Args: { rate_arg: number }
        Returns: {
          id: string
          name: string
          description: string
          category: string
          address: string
          url: string
          created_at: string
        }[]
      }
    }
    Enums: {
      app_role: "user" | "admin"
      category: "restaurante" | "hotel" | "banco" | "natureza" | "loja"
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
      app_role: ["user", "admin"],
      category: ["restaurante", "hotel", "banco", "natureza", "loja"],
    },
  },
} as const
