"use client";

import React, { useEffect, useState, createContext, ReactNode } from "react";
import {
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "@firebase/auth";
import { auth } from "@/firebase/init";
import LoadingScreen from "@/components/section/LoadingScreen";

interface AuthContextInterface {
  user: User | null;
  signUp: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>({
  user: null,
  signUp: async () => {
    throw new Error("AuthProvider not ready");
  },
  signIn: async () => {
    throw new Error("AuthProvider not ready");
  },
  signOut: async () => {
    throw new Error("AuthProvider not ready");
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(credential.user);
    return credential.user;
  }

  async function signIn(email: string, password: string) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(credential.user);
    return credential.user;
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setUser(null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user); // Add this line
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>Loading...</div> //<LoadingScreen />
    );
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
