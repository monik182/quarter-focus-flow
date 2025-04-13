
import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Indicator, Goal } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, TrendingUp } from "lucide-react";

export function IndicatorTrends() {
  const { currentPlan } = usePlan();
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  
  // Early return if no plan exists
  if (!currentPlan || !currentPlan.goals || currentPlan.goals.length === 0) {
    return (
      <div className="p-6 text-center">
        <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Indicators Available</h3>
        <p className="text-muted-foreground">
          Create goals with indicators to track your progress over time.
        </p>
      </div>
    );
  }
  
  // Get goals with indicators
  const goalsWithIndicators = currentPlan.goals.filter(
    goal => goal.indicators && goal.indicators.length > 0
  );
  
  // Early return if no goals with indicators
  if (goalsWithIndicators.length === 0) {
    return (
      <div className="p-6 text-center">
        <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Indicators Available</h3>
        <p className="text-muted-foreground">
          Add indicators to your goals to track progress measurements over time.
        </p>
      </div>
    );
  }
  
  // Set initial selected goal and indicator if none selected yet
  if (!selectedGoalId && goalsWithIndicators.length > 0) {
    const firstGoal = goalsWithIndicators[0];
    setSelectedGoalId(firstGoal.id);
    
    if (firstGoal.indicators && firstGoal.indicators.length > 0) {
      setSelectedIndicator(firstGoal.indicators[0]);
    }
  }
  
  // Get the currently selected goal
  const selectedGoal = currentPlan.goals.find(goal => goal.id === selectedGoalId);
  
  // Handle goal selection change
  const handleGoalChange = (goalId: string) => {
    setSelectedGoalId(goalId);
    const goal = currentPlan.goals.find(g => g.id === goalId);
    if (goal && goal.indicators && goal.indicators.length > 0) {
      setSelectedIndicator(goal.indicators[0]);
    } else {
      setSelectedIndicator(null);
    }
  };
  
  // Handle indicator selection change
  const handleIndicatorChange = (indicatorId: string) => {
    if (selectedGoal && selectedGoal.indicators) {
      const indicator = selectedGoal.indicators.find(ind => ind.id === indicatorId);
      if (indicator) {
        setSelectedIndicator(indicator);
      }
    }
  };
  
  // Generate sample data for chart (in a real app, this would come from the database)
  const generateChartData = (indicator: Indicator | null) => {
    if (!indicator) return [];
    
    const { initialValue, goalValue } = indicator;
    const weekCount = 12;
    
    // Create a realistic progress curve (slightly random but trending toward the goal)
    return Array.from({ length: weekCount }, (_, i) => {
      const week = i + 1;
      const progress = i / (weekCount - 1);
      
      // Add some randomness but ensure trend towards goal
      const randomFactor = Math.random() * 0.2 - 0.1; // -10% to +10%
      const adjustedProgress = Math.max(0, Math.min(1, progress + randomFactor * (1 - progress)));
      
      const valueRange = goalValue - initialValue;
      const currentValue = Math.round(initialValue + valueRange * adjustedProgress);
      
      return {
        week: `Week ${week}`,
        value: currentValue,
        initial: initialValue,
        target: goalValue
      };
    });
  };
  
  const chartData = generateChartData(selectedIndicator);
  
  return (
    <div className="space-y-6 p-1">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1 block">Select Goal</label>
          <Select value={selectedGoalId} onValueChange={handleGoalChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              {goalsWithIndicators.map(goal => (
                <SelectItem key={goal.id} value={goal.id}>
                  {goal.content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/2">
          <label className="text-sm font-medium mb-1 block">Select Indicator</label>
          <Select 
            value={selectedIndicator?.id} 
            onValueChange={handleIndicatorChange}
            disabled={!selectedGoal || !selectedGoal.indicators || selectedGoal.indicators.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an indicator" />
            </SelectTrigger>
            <SelectContent>
              {selectedGoal?.indicators?.map(indicator => (
                <SelectItem key={indicator.id} value={indicator.id}>
                  {indicator.content}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {selectedIndicator && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedIndicator.content}</CardTitle>
            <CardDescription>
              Tracking progress from {selectedIndicator.initialValue} to {selectedIndicator.goalValue} {selectedIndicator.metric}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="line">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="line" className="flex items-center">
                    <LineChart className="w-4 h-4 mr-2" /> Line
                  </TabsTrigger>
                  <TabsTrigger value="bar" className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" /> Bar
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="line" className="pt-2">
                <div className="h-[350px]">
                  <ChartContainer
                    config={{
                      value: {
                        theme: {
                          light: "#8B5CF6",
                          dark: "#A78BFA",
                        },
                      },
                      initial: {
                        theme: {
                          light: "#DDDFE5",
                          dark: "#4B5563",
                        },
                      },
                      target: {
                        theme: {
                          light: "#4ADE80",
                          dark: "#22C55E",
                        },
                      },
                    }}
                  >
                    <ComposedChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent labelClassName="font-bold" />}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        name="Value"
                        stroke="var(--color-value)"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="initial"
                        name="Initial"
                        stroke="var(--color-initial)"
                        strokeDasharray="4 4"
                        strokeWidth={1}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target"
                        stroke="var(--color-target)"
                        strokeDasharray="4 4"
                        strokeWidth={1}
                        dot={false}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="bar" className="pt-2">
                <div className="h-[350px]">
                  <ChartContainer
                    config={{
                      value: {
                        theme: {
                          light: "#8B5CF6",
                          dark: "#A78BFA",
                        },
                      },
                      target: {
                        theme: {
                          light: "#4ADE80",
                          dark: "#22C55E",
                        },
                      },
                    }}
                  >
                    <ComposedChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip
                        content={<ChartTooltipContent labelClassName="font-bold" />}
                      />
                      <Bar
                        dataKey="value"
                        name="Value"
                        fill="var(--color-value)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name="Target"
                        stroke="var(--color-target)"
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
