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
import { auth } from "@/firebase/init";
import LoadingScreen from "@/components/section/LoadingScreen";

interface AuthContextInterface {
  user: User | null;
  error: string | null;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>({
  user: null,
  error: null,
  signUp: async () => {
    throw new Error("AuthProvider not ready");
  },
  signIn: async () => {
    throw new Error("AuthProvider not ready");
  },
  signOut: async () => {
    throw new Error("AuthProvider not ready");
  },
  forgotPassword: async () => {
    throw new Error("AuthProvider not ready");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{ user, error, signUp, signIn, signOut, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
