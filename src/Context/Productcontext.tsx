// AppContext.tsx
import React, { createContext, useContext } from 'react';

/* 1️⃣  Describe exactly what the context exposes */
interface AppContextValue {
  myName: string;
}

/* 2️⃣  Give createContext a generic so it's typed */
const AppContext = createContext<AppContextValue | undefined>(undefined);

/* 3️⃣  Provider – declare children type (ReactNode) */
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: AppContextValue = { myName: 'Sunny' };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/* 4️⃣  Custom hook with a helpful runtime guard */
export const useProductContext = (): AppContextValue => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useProductContext must be used inside <AppProvider>');
  return ctx;
};
