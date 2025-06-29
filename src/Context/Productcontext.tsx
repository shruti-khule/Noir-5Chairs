// AppContext.tsx
import React, { createContext, useContext } from 'react';

interface AppContextValue {
  myName: string;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: AppContextValue = { myName: 'Sunny' };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useProductContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useProductContext must be used inside <AppProvider>');
  return ctx;
};
