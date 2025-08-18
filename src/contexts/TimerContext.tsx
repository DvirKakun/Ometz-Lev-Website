import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface TimerContextType {
  isTimerClosed: boolean;
  isTimerHidden: boolean;
  closeTimer: () => void;
  hideTimer: () => void;
  showTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [isTimerClosed, setIsTimerClosed] = useState(false);
  const [isTimerHidden, setIsTimerHidden] = useState(false);

  const closeTimer = () => {
    setIsTimerClosed(true);
  };

  const hideTimer = () => {
    setIsTimerHidden(true);
  };

  const showTimer = () => {
    setIsTimerHidden(false);
  };

  return (
    <TimerContext.Provider value={{ isTimerClosed, isTimerHidden, closeTimer, hideTimer, showTimer }}>
      {children}
    </TimerContext.Provider>
  );
};