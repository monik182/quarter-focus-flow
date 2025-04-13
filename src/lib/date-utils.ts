
import { format, addWeeks, isSameDay, isBefore, isAfter, isWithinInterval } from "date-fns";

export const formatDate = (date: Date | string): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM dd, yyyy");
};

export const formatShortDate = (date: Date | string): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "MMM dd");
};

export const getWeekLabel = (weekNumber: number, startDate: Date): string => {
  const weekStartDate = addWeeks(startDate, weekNumber - 1);
  const weekEndDate = addWeeks(weekStartDate, 1);
  return `${format(weekStartDate, "MMM dd")} - ${format(weekEndDate, "MMM dd")}`;
};

export const getPlanDurationLabel = (startDate: Date, endDate: Date): string => {
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isPast = (date: Date): boolean => {
  return isBefore(date, new Date());
};

export const isFuture = (date: Date): boolean => {
  return isAfter(date, new Date());
};

export const isCurrentWeek = (date: Date): boolean => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  return isWithinInterval(date, { start: startOfWeek, end: endOfWeek });
};
