"use client"
import { createContext, useContext, useState, ReactNode } from "react";

// Typa pauseWeek till att vara antingen string eller null
type PauseWeekContextType = {
  pauseWeek: string | null;
  setPauseWeek: (week: string | null) => void;
};

const PauseWeekContext = createContext<PauseWeekContextType | undefined>(undefined);

interface PauseWeekProviderProps {
  children: ReactNode;
}

export const PauseWeekProvider: React.FC<PauseWeekProviderProps> = ({ children }) => {
  const [pauseWeek, setPauseWeek] = useState<string | null>(null);

  return (
    <PauseWeekContext.Provider value={{ pauseWeek, setPauseWeek }}>
      {children}
    </PauseWeekContext.Provider>
  );
};

export const usePauseWeek = () => {
  const context = useContext(PauseWeekContext);
  if (!context) {
    throw new Error("usePauseWeek must be used within a PauseWeekProvider");
  }
  return context;
};


