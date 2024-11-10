'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalStoreContextProps {
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
}

const GlobalStoreContext = createContext<GlobalStoreContextProps | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <GlobalStoreContext.Provider value={{ userId, setUserId }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  const context = useContext(GlobalStoreContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a GlobalStateProvider');
  }
  return context;
};
