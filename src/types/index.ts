
export interface Plan {
  id: string;
  userId: string;
  vision: string;
  milestone: string;
  completed: boolean;
  started: boolean;
  startDate: Date;
  endDate: Date;
  created: Date;
  lastUpdate: Date;
  goals?: Goal[];
}

export interface Goal {
  id: string;
  planId: string;
  content: string;
  status: string;
  strategies?: Strategy[];
  indicators?: Indicator[];
}

export interface Strategy {
  id: string;
  goalId: string;
  planId: string;
  content: string;
  weeks: number[];  // Changed from string[] to number[] to store selected week numbers
  status: string;
  frequency: number;
  history?: StrategyHistory[];
}

export interface StrategyHistory {
  id: string;
  strategyId: string;
  planId: string;
  overdue: boolean;
  completed: boolean;
  firstUpdate: Date | null;
  lastUpdate: Date | null;
  sequence: number;
  frequencies: boolean[];
}

export interface Indicator {
  id: string;
  goalId: string;
  planId: string;
  content: string;
  metric: string;
  initialValue: number;
  goalValue: number;
  status: string;
  history?: IndicatorHistory[];
}

export interface IndicatorHistory {
  id: string;
  indicatorId: string;
  planId: string;
  value: number;
  sequence: number;
}

export enum Status {
  ACTIVE = "1",
  ARCHIVED = "0",
  DELETED = "-1"
}
