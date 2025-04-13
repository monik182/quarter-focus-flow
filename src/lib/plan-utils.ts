
import { Plan, Goal, Strategy, Indicator } from "@/types";
import { addWeeks } from "date-fns";

export const generatePlan = (startDate: Date): Plan => {
  const endDate = addWeeks(startDate, 12);
  
  return {
    id: crypto.randomUUID(),
    userId: "guest",
    vision: "",
    milestone: "",
    completed: false,
    started: false,
    startDate,
    endDate,
    created: new Date(),
    lastUpdate: new Date(),
    goals: [],
  };
};

export const getWeekNumber = (date: Date, planStartDate: Date): number => {
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  const startWeekTime = new Date(planStartDate).getTime();
  const dateTime = new Date(date).getTime();
  
  const weekDiff = Math.floor((dateTime - startWeekTime) / msPerWeek);
  return Math.max(1, Math.min(12, weekDiff + 1));
};

export const getCurrentWeek = (plan: Plan): number => {
  if (!plan) return 0;
  
  const today = new Date();
  return getWeekNumber(today, plan.startDate);
};

export const getWeekDate = (plan: Plan, weekNumber: number): Date => {
  if (!plan) return new Date();
  
  const startDate = new Date(plan.startDate);
  return addWeeks(startDate, weekNumber - 1);
};

export const calculateGoalProgress = (goal: Goal): number => {
  if (!goal.strategies || goal.strategies.length === 0) return 0;
  
  // This is a simplified implementation that returns a random progress
  // In a real implementation, we would calculate based on actual data
  return Math.floor(Math.random() * 101);
};

export const calculateIndicatorProgress = (indicator: Indicator): number => {
  if (!indicator) return 0;
  
  const { initialValue, goalValue } = indicator;
  
  // In a real implementation, we would use history data
  const currentValue = Math.floor(initialValue + (Math.random() * (goalValue - initialValue)));
  
  const totalChange = goalValue - initialValue;
  
  if (totalChange === 0) return 100; // Already at goal
  
  const currentChange = currentValue - initialValue;
  const progress = (currentChange / totalChange) * 100;
  
  return Math.max(0, Math.min(100, Math.round(progress)));
};

export const calculatePlanProgress = (plan: Plan): number => {
  if (!plan || !plan.goals || plan.goals.length === 0) return 0;
  
  const goalProgresses = plan.goals.map(goal => calculateGoalProgress(goal));
  
  if (goalProgresses.length === 0) return 0;
  
  const totalProgress = goalProgresses.reduce((sum, progress) => sum + progress, 0);
  return Math.round(totalProgress / goalProgresses.length);
};
