
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  session: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any | null>(null);

  // Placeholder functions for now
  const signIn = async (email: string, password: string) => {
    console.log('Sign in:', email, password);
    // TODO: Implement with Supabase
    setSession({ user: { email } });
  };

  const signUp = async (email: string, password: string) => {
    console.log('Sign up:', email, password);
    // TODO: Implement with Supabase
  };

  const signOut = async () => {
    // TODO: Implement with Supabase
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    console.log('Reset password:', email);
    // TODO: Implement with Supabase
  };

  return (
    <AuthContext.Provider value={{ session, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
