
import React, { createContext, useState, useContext, useEffect } from "react";
import { Plan, Goal, Strategy, Indicator } from "@/types";
import { generatePlan } from "@/lib/plan-utils";
import { useToast } from "@/components/ui/use-toast";

interface PlanContextProps {
  currentPlan: Plan | null;
  isLoading: boolean;
  createNewPlan: (startDate: Date) => void;
  updatePlan: (planData: Partial<Plan>) => void;
  createGoal: (goalContent: string) => void;
  updateGoal: (goalId: string, goalData: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  createStrategy: (goalId: string, strategyData: Partial<Strategy>) => void;
  updateStrategy: (strategyId: string, strategyData: Partial<Strategy>) => void;
  deleteStrategy: (strategyId: string) => void;
  createIndicator: (goalId: string, indicatorData: Partial<Indicator>) => void;
  updateIndicator: (indicatorId: string, indicatorData: Partial<Indicator>) => void;
  deleteIndicator: (indicatorId: string) => void;
}

const PlanContext = createContext<PlanContextProps | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load the plan from localStorage on initial render
    const loadPlan = () => {
      setIsLoading(true);
      try {
        const storedPlan = localStorage.getItem("currentPlan");
        if (storedPlan) {
          const parsedPlan = JSON.parse(storedPlan);
          
          // Convert string dates to Date objects
          if (parsedPlan.startDate) parsedPlan.startDate = new Date(parsedPlan.startDate);
          if (parsedPlan.endDate) parsedPlan.endDate = new Date(parsedPlan.endDate);
          if (parsedPlan.created) parsedPlan.created = new Date(parsedPlan.created);
          if (parsedPlan.lastUpdate) parsedPlan.lastUpdate = new Date(parsedPlan.lastUpdate);
          
          setCurrentPlan(parsedPlan);
        }
      } catch (error) {
        console.error("Error loading plan:", error);
        toast({
          title: "Error",
          description: "Failed to load your plan data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPlan();
  }, [toast]);

  // Save the plan to localStorage whenever it changes
  useEffect(() => {
    if (currentPlan) {
      localStorage.setItem("currentPlan", JSON.stringify(currentPlan));
    }
  }, [currentPlan]);

  const createNewPlan = (startDate: Date) => {
    try {
      const newPlan = generatePlan(startDate);
      setCurrentPlan(newPlan);
      toast({
        title: "Plan Created",
        description: "Your new 12-week plan has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating plan:", error);
      toast({
        title: "Error",
        description: "Failed to create a new plan.",
        variant: "destructive",
      });
    }
  };

  const updatePlan = (planData: Partial<Plan>) => {
    if (!currentPlan) return;
    
    try {
      const updatedPlan = {
        ...currentPlan,
        ...planData,
        lastUpdate: new Date(),
      };
      setCurrentPlan(updatedPlan);
      toast({
        title: "Plan Updated",
        description: "Your plan has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating plan:", error);
      toast({
        title: "Error",
        description: "Failed to update the plan.",
        variant: "destructive",
      });
    }
  };

  const createGoal = (goalContent: string) => {
    if (!currentPlan) return;
    
    try {
      const newGoal: Goal = {
        id: crypto.randomUUID(),
        planId: currentPlan.id,
        content: goalContent,
        status: "1",
        strategies: [],
        indicators: [],
      };

      const updatedPlan = {
        ...currentPlan,
        goals: [...(currentPlan.goals || []), newGoal],
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Goal Created",
        description: "Your new goal has been added to the plan.",
      });
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create a new goal.",
        variant: "destructive",
      });
    }
  };

  const updateGoal = (goalId: string, goalData: Partial<Goal>) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.map(goal => 
        goal.id === goalId ? { ...goal, ...goalData } : goal
      );

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Goal Updated",
        description: "Your goal has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating goal:", error);
      toast({
        title: "Error",
        description: "Failed to update the goal.",
        variant: "destructive",
      });
    }
  };

  const deleteGoal = (goalId: string) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.filter(goal => goal.id !== goalId);

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Goal Deleted",
        description: "Your goal has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast({
        title: "Error",
        description: "Failed to delete the goal.",
        variant: "destructive",
      });
    }
  };

  const createStrategy = (goalId: string, strategyData: Partial<Strategy>) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const newStrategy: Strategy = {
        id: crypto.randomUUID(),
        goalId,
        planId: currentPlan.id,
        content: strategyData.content || "",
        weeks: strategyData.weeks || [],
        status: "1",
        frequency: strategyData.frequency || 1,
      };

      const updatedGoals = currentPlan.goals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            strategies: [...(goal.strategies || []), newStrategy],
          };
        }
        return goal;
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Strategy Created",
        description: "Your new strategy has been added to the goal.",
      });
    } catch (error) {
      console.error("Error creating strategy:", error);
      toast({
        title: "Error",
        description: "Failed to create a new strategy.",
        variant: "destructive",
      });
    }
  };

  const updateStrategy = (strategyId: string, strategyData: Partial<Strategy>) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.map(goal => {
        if (!goal.strategies) return goal;
        
        const updatedStrategies = goal.strategies.map(strategy =>
          strategy.id === strategyId ? { ...strategy, ...strategyData } : strategy
        );
        
        return {
          ...goal,
          strategies: updatedStrategies,
        };
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Strategy Updated",
        description: "Your strategy has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating strategy:", error);
      toast({
        title: "Error",
        description: "Failed to update the strategy.",
        variant: "destructive",
      });
    }
  };

  const deleteStrategy = (strategyId: string) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.map(goal => {
        if (!goal.strategies) return goal;
        
        return {
          ...goal,
          strategies: goal.strategies.filter(strategy => strategy.id !== strategyId),
        };
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Strategy Deleted",
        description: "Your strategy has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting strategy:", error);
      toast({
        title: "Error",
        description: "Failed to delete the strategy.",
        variant: "destructive",
      });
    }
  };

  const createIndicator = (goalId: string, indicatorData: Partial<Indicator>) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const newIndicator: Indicator = {
        id: crypto.randomUUID(),
        goalId,
        planId: currentPlan.id,
        content: indicatorData.content || "",
        metric: indicatorData.metric || "",
        initialValue: indicatorData.initialValue || 0,
        goalValue: indicatorData.goalValue || 0,
        status: "1",
      };

      const updatedGoals = currentPlan.goals.map(goal => {
        if (goal.id === goalId) {
          return {
            ...goal,
            indicators: [...(goal.indicators || []), newIndicator],
          };
        }
        return goal;
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Indicator Created",
        description: "Your new indicator has been added to the goal.",
      });
    } catch (error) {
      console.error("Error creating indicator:", error);
      toast({
        title: "Error",
        description: "Failed to create a new indicator.",
        variant: "destructive",
      });
    }
  };

  const updateIndicator = (indicatorId: string, indicatorData: Partial<Indicator>) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.map(goal => {
        if (!goal.indicators) return goal;
        
        const updatedIndicators = goal.indicators.map(indicator =>
          indicator.id === indicatorId ? { ...indicator, ...indicatorData } : indicator
        );
        
        return {
          ...goal,
          indicators: updatedIndicators,
        };
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Indicator Updated",
        description: "Your indicator has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating indicator:", error);
      toast({
        title: "Error",
        description: "Failed to update the indicator.",
        variant: "destructive",
      });
    }
  };

  const deleteIndicator = (indicatorId: string) => {
    if (!currentPlan || !currentPlan.goals) return;
    
    try {
      const updatedGoals = currentPlan.goals.map(goal => {
        if (!goal.indicators) return goal;
        
        return {
          ...goal,
          indicators: goal.indicators.filter(indicator => indicator.id !== indicatorId),
        };
      });

      const updatedPlan = {
        ...currentPlan,
        goals: updatedGoals,
        lastUpdate: new Date(),
      };
      
      setCurrentPlan(updatedPlan);
      toast({
        title: "Indicator Deleted",
        description: "Your indicator has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting indicator:", error);
      toast({
        title: "Error",
        description: "Failed to delete the indicator.",
        variant: "destructive",
      });
    }
  };

  const value = {
    currentPlan,
    isLoading,
    createNewPlan,
    updatePlan,
    createGoal,
    updateGoal,
    deleteGoal,
    createStrategy,
    updateStrategy,
    deleteStrategy,
    createIndicator,
    updateIndicator,
    deleteIndicator,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const usePlan = (): PlanContextProps => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
