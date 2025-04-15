import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/PlanContext";
import { ChevronLeft, ChevronRight, Check, X, Edit } from "lucide-react";
import { getWeekLabel } from "@/lib/date-utils";
import { getCurrentWeek } from "@/lib/plan-utils";
import { StrategyDialog } from "@/components/StrategyDialog";
import { IndicatorDialog } from "@/components/IndicatorDialog";
import { Strategy, Indicator } from "@/types";

export function WeeklyProgress() {
  const { currentPlan } = usePlan();
  
  if (!currentPlan) return null;
  
  const totalWeeks = 12;
  const currentWeekNumber = getCurrentWeek(currentPlan);
  
  const selectableWeeks = Math.min(currentWeekNumber, totalWeeks);
  
  const [activeWeek, setActiveWeek] = useState(selectableWeeks);
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && activeWeek > 1) {
      setActiveWeek(activeWeek - 1);
    } else if (direction === 'next' && activeWeek < selectableWeeks) {
      setActiveWeek(activeWeek + 1);
    }
  };
  
  const weekLabel = getWeekLabel(activeWeek, currentPlan.startDate);
  
  const [editingStrategy, setEditingStrategy] = useState<Strategy | undefined>();
  const [editingIndicator, setEditingIndicator] = useState<Indicator | undefined>();
  const [isStrategyDialogOpen, setIsStrategyDialogOpen] = useState(false);
  const [isIndicatorDialogOpen, setIsIndicatorDialogOpen] = useState(false);

  const handleEditStrategy = (strategy: Strategy) => {
    setEditingStrategy(strategy);
    setIsStrategyDialogOpen(true);
  };

  const handleEditIndicator = (indicator: Indicator) => {
    setEditingIndicator(indicator);
    setIsIndicatorDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly Progress</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={activeWeek <= 1}
              onClick={() => navigateWeek('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Week {activeWeek} ({weekLabel})
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={activeWeek >= selectableWeeks}
              onClick={() => navigateWeek('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="strategies">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
          </TabsList>
          <TabsContent value="strategies" className="space-y-4 pt-4">
            {currentPlan.goals?.flatMap(goal => goal.strategies || []).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No strategies to track. Add strategies to your goals to track weekly progress.
                </p>
              </div>
            ) : (
              currentPlan.goals?.map(goal => (
                <div key={goal.id} className="space-y-3">
                  <h3 className="font-medium">{goal.content}</h3>
                  {goal.strategies && goal.strategies.length > 0 ? (
                    goal.strategies.map(strategy => (
                      <Card key={strategy.id} className="shadow-none border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">{strategy.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Target: {strategy.frequency}x this week
                                {!strategy.weeks.includes(activeWeek) && (
                                  <span className="text-yellow-500 ml-2">(Not scheduled this week)</span>
                                )}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditStrategy(strategy)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              {strategy.weeks.includes(activeWeek) && (
                                <div className="flex gap-1">
                                  {Array.from({ length: strategy.frequency }).map((_, i) => (
                                    <Button
                                      key={i}
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7"
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No strategies for this goal</p>
                  )}
                </div>
              ))
            )}
          </TabsContent>
          <TabsContent value="indicators" className="space-y-4 pt-4">
            {currentPlan.goals?.flatMap(goal => goal.indicators || []).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No indicators to track. Add indicators to your goals to measure progress.
                </p>
              </div>
            ) : (
              currentPlan.goals?.map(goal => (
                <div key={goal.id} className="space-y-3">
                  <h3 className="font-medium">{goal.content}</h3>
                  {goal.indicators && goal.indicators.length > 0 ? (
                    goal.indicators.map(indicator => (
                      <Card key={indicator.id} className="shadow-none border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm">{indicator.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Current: {indicator.initialValue} {indicator.metric} → Target: {indicator.goalValue} {indicator.metric}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditIndicator(indicator)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Update
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No indicators for this goal</p>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <StrategyDialog
        goalId={editingStrategy?.goalId || ""}
        open={isStrategyDialogOpen}
        onOpenChange={setIsStrategyDialogOpen}
        strategy={editingStrategy}
      />

      <IndicatorDialog
        goalId={editingIndicator?.goalId || ""}
        open={isIndicatorDialogOpen}
        onOpenChange={setIsIndicatorDialogOpen}
        indicator={editingIndicator}
      />
    </Card>
  );
}
