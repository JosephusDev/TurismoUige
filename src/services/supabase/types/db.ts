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
      location: {
        Row: {
          address: string | null
          category: Database["public"]["Enums"]["category"] | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string | null
        }
        Insert: {
          address?: string | null
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
        }
        Update: {
          address?: string | null
          category?: Database["public"]["Enums"]["category"] | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
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
          user_id: string
          value: number
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          locate_id?: string
          user_id?: string
          value: number
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          locate_id?: string
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "rate_locate_id_fkey"
            columns: ["locate_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rate_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_locates_by_greatest_rate: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          description: string
          category: Database["public"]["Enums"]["category"]
          address: string
          image_url: string
          created_at: string
          average_rating: number
        }[]
      }
      get_locates_by_rates: {
        Args: {
          rate_arg: number
        }
        Returns: {
          id: string
          name: string
          description: string
          category: Database["public"]["Enums"]["category"]
          address: string
          image_url: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
