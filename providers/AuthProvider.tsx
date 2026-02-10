"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "@firebase/auth";
import { auth, isFirebaseBypassed } from "@/firebase/init";
import LoadingScreen from "@/components/section/LoadingScreen";

export interface AuthContextInterface {
  user: User | null;
  error: string | null;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  referralCode: string | null;
}

// 👇 Viktigt: default är null (annars får du TS7022-felet)
export const AuthContext = createContext<AuthContextInterface | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  async function signUp(email: string, password: string) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credential.user);
      return credential.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credential.user);
      return credential.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        try {
          const response = await fetch(`/api/getReferralCode?uid=${user.uid}`);
          const data = await response.json();

          if (response.ok && data.referralCode) {
            setReferralCode(data.referralCode);
          } else {
            console.error("Failed to fetch referral code:", data.error);
          }
        } catch (error) {
          console.error("Error fetching referral code:", error);
        }
      } else {
        setReferralCode(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const contextValue: AuthContextInterface = {
    user,
    error,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    referralCode,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
