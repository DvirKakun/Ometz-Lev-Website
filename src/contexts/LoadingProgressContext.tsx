import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface LoadingProgressContextType {
  progress: number | undefined;
  setProgress: (progress: number | undefined) => void;
}

const LoadingProgressContext = createContext<LoadingProgressContextType | undefined>(undefined);

export const LoadingProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number | undefined>(undefined);

  return (
    <LoadingProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </LoadingProgressContext.Provider>
  );
};

export const useLoadingProgress = () => {
  const context = useContext(LoadingProgressContext);
  if (context === undefined) {
    throw new Error('useLoadingProgress must be used within a LoadingProgressProvider');
  }
  return context;
};