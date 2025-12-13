'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, Session, User as SupabaseUser } from '@supabase/supabase-js';

// Client-side Supabase instance
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  email: string;
  subscription_plan: 'starter' | 'professional' | 'enterprise';
  monthly_lead_limit: number;
  leads_used: number;
  created_at: string;
  updated_at: string;
  billing_address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  gstin?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from public.users table
  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // Return basic user info if profile not found
        return {
          id: authUser.id,
          email: authUser.email || '',
          subscription_plan: 'starter' as const,
          monthly_lead_limit: 100,
          leads_used: 0,
          created_at: authUser.created_at,
          updated_at: new Date().toISOString(),
        };
      }

      return data as User;
    } catch (err) {
      console.error('Profile fetch error:', err);
      return null;
    }
  };

  // Check session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get current session
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (currentSession?.user) {
          setSession(currentSession);
          const profile = await fetchUserProfile(currentSession.user);
          setUser(profile);
        }
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);

        if (newSession?.user) {
          const profile = await fetchUserProfile(newSession.user);
          setUser(profile);
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      // Sign up with Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create user profile in public.users
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            subscription_plan: 'starter',
            monthly_lead_limit: 100,
            leads_used: 0,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw - auth user was created successfully
        }
      }

      // Auto login after signup
      if (data.session) {
        setSession(data.session);
        if (data.user) {
          const profile = await fetchUserProfile(data.user);
          setUser(profile);
        }
      }
    } catch (err: any) {
      const message = err?.message || 'Signup failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session) {
        setSession(data.session);
        if (data.user) {
          const profile = await fetchUserProfile(data.user);
          setUser(profile);
        }
      }
    } catch (err: any) {
      const message = err?.message || 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setLoading(true);

      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      setUser(null);
      setSession(null);
    } catch (err: any) {
      const message = err?.message || 'Logout failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!session && !!user,
        signup,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
