export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeUnit {
  value: number;
  label: string;
  previousValue?: number;
}

export interface CountdownTimerProps {
  targetDate: Date;
  eventTitle?: string;
  className?: string;
  showEventInfo?: boolean;
}

export interface TimeUnitCardProps {
  value: number;
  label: string;
  previousValue?: number;
  className?: string;
}

export interface EventInfoProps {
  targetDate: Date;
  eventTitle?: string;
  className?: string;
}
