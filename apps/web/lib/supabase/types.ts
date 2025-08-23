export interface Database {
  public: {
    Tables: {
      early_access: {
        Row: {
          id: string
          email: string
          utm_source: string | null
          utm_campaign: string | null
          utm_medium: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          utm_source?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          utm_source?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          privy_user_id: string
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          privy_user_id: string
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          privy_user_id?: string
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      twitter_accounts: {
        Row: {
          id: string
          user_id: string
          handle: string | null
          twitter_user_id: string | null
          access_token_encrypted: string | null
          refresh_token_encrypted: string | null
          scopes: string[] | null
          connected_at: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          handle?: string | null
          twitter_user_id?: string | null
          access_token_encrypted?: string | null
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          connected_at?: string
          status?: string
        }
        Update: {
          id?: string
          user_id?: string
          handle?: string | null
          twitter_user_id?: string | null
          access_token_encrypted?: string | null
          refresh_token_encrypted?: string | null
          scopes?: string[] | null
          connected_at?: string
          status?: string
        }
      }
      influencer_settings: {
        Row: {
          id: string
          user_id: string
          content_types: string[] | null
          target_languages: string[] | null
          publish_behavior: string | null
          reply_template: string | null
          auto_publish: boolean
          auto_dub_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_types?: string[] | null
          target_languages?: string[] | null
          publish_behavior?: string | null
          reply_template?: string | null
          auto_publish?: boolean
          auto_dub_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_types?: string[] | null
          target_languages?: string[] | null
          publish_behavior?: string | null
          reply_template?: string | null
          auto_publish?: boolean
          auto_dub_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sources: {
        Row: {
          id: string
          user_id: string
          twitter_account_id: string
          source_id: string
          source_type: string
          source_url: string
          media_url: string | null
          media_s3_key: string | null
          duration_seconds: number | null
          discovered_at: string | null
          error_message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          twitter_account_id: string
          source_id: string
          source_type: string
          source_url: string
          media_url?: string | null
          media_s3_key?: string | null
          duration_seconds?: number | null
          discovered_at?: string | null
          error_message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          twitter_account_id?: string
          source_id?: string
          source_type?: string
          source_url?: string
          media_url?: string | null
          media_s3_key?: string | null
          duration_seconds?: number | null
          discovered_at?: string | null
          error_message?: string | null
          status?: string
          created_at?: string
        }
      }
      speechlab_projects: {
        Row: {
          id: string
          source_id: string
          project_id: string
          third_party_id: string
          project_name: string | null
          status: string
          error_message: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          source_id: string
          project_id: string
          third_party_id: string
          project_name?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          source_id?: string
          project_id?: string
          third_party_id?: string
          project_name?: string | null
          status?: string
          error_message?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      dubs: {
        Row: {
          id: string
          source_id: string
          speechlab_project_id: string | null
          language: string
          output_url: string | null
          output_s3_key: string | null
          status: string
          completed_at: string | null
          published_at: string | null
          published_tweet_id: string | null
          published_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          source_id: string
          speechlab_project_id?: string | null
          language: string
          output_url?: string | null
          output_s3_key?: string | null
          status?: string
          completed_at?: string | null
          published_at?: string | null
          published_tweet_id?: string | null
          published_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          source_id?: string
          speechlab_project_id?: string | null
          language?: string
          output_url?: string | null
          output_s3_key?: string | null
          status?: string
          completed_at?: string | null
          published_at?: string | null
          published_tweet_id?: string | null
          published_url?: string | null
          created_at?: string
        }
      }
      usage_ledger: {
        Row: {
          id: string
          user_id: string
          month: string | null
          minutes_used: number
          languages_count: number | null
          source_id: string | null
          dub_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          month?: string | null
          minutes_used?: number
          languages_count?: number | null
          source_id?: string | null
          dub_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          month?: string | null
          minutes_used?: number
          languages_count?: number | null
          source_id?: string | null
          dub_id?: string | null
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          plan_id: string | null
          status: string | null
          current_period_start: string | null
          current_period_end: string | null
          allow_overage?: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_id?: string | null
          status?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          allow_overage?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          plan_id?: string | null
          status?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          allow_overage?: boolean
          created_at?: string
        }
      }
      oauth_sessions: {
        Row: {
          id: string
          user_id: string
          state: string
          code_verifier: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          state: string
          code_verifier: string
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          user_id?: string
          state?: string
          code_verifier?: string
          created_at?: string
          expires_at?: string
        }
      }
    }
  }
}