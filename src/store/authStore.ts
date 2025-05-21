import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../types';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profile: Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  
  signIn: async (email, password) => {
    set({ loading: true });
    try {
      console.log("Attempting sign in for email:", email);
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      const user = authData.user;
      if (!user) {
        console.error("No user returned after successful sign in");
        throw new Error('Gagal mendapatkan data user setelah login');
      }

      console.log("User signed in successfully:", user.id);
      set({ user });

      // Fetch profile after sign in
      try {
        console.log("Fetching profile for user:", user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        }

        console.log("Profile data:", profile);
        set({ profile });
      } catch (profileErr) {
        console.error("Exception in profile fetch:", profileErr);
        // Don't throw here either
      }
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password, profile) => {
    set({ loading: true });
    try {
      console.log("Attempting sign up for email:", email);
      
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        console.error("Sign up error:", signUpError);
        throw signUpError;
      }
      
      const user = data.user ?? data.session?.user;

      if (!user) {
        console.warn("User created but is not active yet");
        throw new Error('Akun berhasil dibuat, tapi pengguna belum aktif. Silakan verifikasi email terlebih dahulu.');
      }
      
      console.log("User signed up successfully:", user.id);
      
      if (data.user) {
        console.log("Creating profile for user:", user.id);
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: data.user.id,
              ...profile,
            },
          ]);
          
        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
        
        console.log("Profile created successfully");
      }
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  
  signOut: async () => {
    set({ loading: true });
    try {
      console.log("Attempting sign out");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      
      console.log("User signed out successfully");
      set({ user: null, profile: null });
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  

  
  updateProfile: async (profileData) => {
    const user = get().user;
    if (!user) {
      console.error("Cannot update profile: No user authenticated");
      throw new Error('User not authenticated');
    }
    
    set({ loading: true });
    try {
      console.log("Updating profile for user:", user.id, "with data:", profileData);
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
      
      console.log("Profile updated successfully, fetching updated profile");
      
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (fetchError) {
        console.error("Error fetching updated profile:", fetchError);
        throw fetchError;
      }
      
      console.log("Updated profile data:", profile);
      set({ profile });
    } catch (err) {
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
