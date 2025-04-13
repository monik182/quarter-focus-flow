
import React, { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Lightbulb, Target, ListChecks, BarChart2, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Goal } from "@/types";

// Define types for different kinds of suggestions
interface GoalSuggestion {
  id: string;
  type: "goal";
  content: string;
  reason: string;
  tags: string[];
}

interface StrategySuggestion {
  id: string;
  type: "strategy";
  goalId: string;
  content: string;
  frequency: number;
  reason: string;
}

interface IndicatorSuggestion {
  id: string;
  type: "indicator";
  goalId: string;
  content: string;
  metric: string;
  initialValue: number;
  goalValue: number;
  reason: string;
}

type Suggestion = GoalSuggestion | StrategySuggestion | IndicatorSuggestion;

export function AISuggestions() {
  const { currentPlan, createGoal, createStrategy, createIndicator } = usePlan();
  const [activeTab, setActiveTab] = useState("goals");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Simulate AI-generated suggestions (in a real app, these would come from an API)
  const generateSuggestions = (): { goals: GoalSuggestion[], strategies: StrategySuggestion[], indicators: IndicatorSuggestion[] } => {
    const goals = currentPlan?.goals || [];
    
    // Goal suggestions based on common patterns or missing areas
    const goalSuggestions: GoalSuggestion[] = [
      {
        id: "g1",
        type: "goal",
        content: "Establish a morning routine for productivity",
        reason: "Morning routines help set the tone for the day and increase overall productivity.",
        tags: ["Personal Development", "Productivity"]
      },
      {
        id: "g2",
        type: "goal",
        content: "Develop a reading habit",
        reason: "Based on your knowledge-based goals, regular reading would support your learning objectives.",
        tags: ["Learning", "Personal Development"]
      },
      {
        id: "g3",
        type: "goal",
        content: "Implement stress reduction techniques",
        reason: "Stress management complements your other goals and improves overall performance.",
        tags: ["Health", "Wellness"]
      }
    ];
    
    // Strategy suggestions based on existing goals
    const strategySuggestions: StrategySuggestion[] = [];
    goals.forEach(goal => {
      if (goal.content.toLowerCase().includes("fitness") || goal.content.toLowerCase().includes("health")) {
        strategySuggestions.push({
          id: `s1-${goal.id}`,
          type: "strategy",
          goalId: goal.id,
          content: "Track daily water intake",
          frequency: 7,
          reason: "Hydration is essential for health and complements your fitness goals."
        });
      }
      
      if (goal.content.toLowerCase().includes("learn") || goal.content.toLowerCase().includes("skill")) {
        strategySuggestions.push({
          id: `s2-${goal.id}`,
          type: "strategy",
          goalId: goal.id,
          content: "Spend 25 minutes on focused learning (Pomodoro technique)",
          frequency: 5,
          reason: "The Pomodoro technique enhances learning efficiency and retention."
        });
      }
      
      strategySuggestions.push({
        id: `s3-${goal.id}`,
        type: "strategy",
        goalId: goal.id,
        content: "Weekly review and planning session",
        frequency: 1,
        reason: "Regular reviews improve goal adherence and course correction."
      });
    });
    
    // Indicator suggestions based on existing goals
    const indicatorSuggestions: IndicatorSuggestion[] = [];
    goals.forEach(goal => {
      if (goal.content.toLowerCase().includes("fitness") || goal.content.toLowerCase().includes("health")) {
        indicatorSuggestions.push({
          id: `i1-${goal.id}`,
          type: "indicator",
          goalId: goal.id,
          content: "Energy level throughout the day",
          metric: "rating (1-10)",
          initialValue: 5,
          goalValue: 8,
          reason: "Subjective energy levels are a good proxy for overall health improvements."
        });
      }
      
      if (goal.content.toLowerCase().includes("productivity") || goal.content.toLowerCase().includes("work")) {
        indicatorSuggestions.push({
          id: `i2-${goal.id}`,
          type: "indicator",
          goalId: goal.id,
          content: "Deep work hours per week",
          metric: "hours",
          initialValue: 5,
          goalValue: 15,
          reason: "Tracking deep work hours helps measure true productivity rather than just activity."
        });
      }
      
      indicatorSuggestions.push({
        id: `i3-${goal.id}`,
        type: "indicator",
        goalId: goal.id,
        content: "Consistency score",
        metric: "%",
        initialValue: 30,
        goalValue: 80,
        reason: "Measuring your consistency helps reinforce habit formation."
      });
    });
    
    return {
      goals: goalSuggestions,
      strategies: strategySuggestions,
      indicators: indicatorSuggestions
    };
  };
  
  const suggestions = generateSuggestions();
  
  const handleGenerateSuggestions = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "New Suggestions Generated",
        description: "AI has analyzed your plan and generated new recommendations.",
      });
    }, 1500);
  };
  
  const handleApplySuggestion = () => {
    if (!selectedSuggestion) return;
    
    try {
      if (selectedSuggestion.type === "goal") {
        createGoal(selectedSuggestion.content);
        toast({
          title: "Goal Added",
          description: "New goal has been added to your plan.",
        });
      } 
      else if (selectedSuggestion.type === "strategy") {
        createStrategy(selectedSuggestion.goalId, {
          content: selectedSuggestion.content,
          frequency: selectedSuggestion.frequency,
          weeks: []
        });
        toast({
          title: "Strategy Added",
          description: "New strategy has been added to your goal.",
        });
      } 
      else if (selectedSuggestion.type === "indicator") {
        createIndicator(selectedSuggestion.goalId, {
          content: selectedSuggestion.content,
          metric: selectedSuggestion.metric,
          initialValue: selectedSuggestion.initialValue,
          goalValue: selectedSuggestion.goalValue
        });
        toast({
          title: "Indicator Added",
          description: "New progress indicator has been added to your goal.",
        });
      }
      
      setIsDialogOpen(false);
      setSelectedSuggestion(null);
    } catch (error) {
      console.error("Error applying suggestion:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply the suggestion. Please try again.",
      });
    }
  };
  
  if (!currentPlan || !currentPlan.goals || currentPlan.goals.length === 0) {
    return (
      <div className="p-6 text-center">
        <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Goals Available for Suggestions</h3>
        <p className="text-muted-foreground">
          Create goals in your plan first to get AI-powered suggestions.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 p-1">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
          AI-Powered Recommendations
        </h2>
        <Button 
          onClick={handleGenerateSuggestions} 
          disabled={isLoading}
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Refresh Suggestions
            </>
          )}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="goals" className="flex items-center justify-center">
            <Target className="h-4 w-4 mr-2" /> Goals
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center justify-center">
            <ListChecks className="h-4 w-4 mr-2" /> Strategies
          </TabsTrigger>
          <TabsTrigger value="indicators" className="flex items-center justify-center">
            <BarChart2 className="h-4 w-4 mr-2" /> Indicators
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="pt-4">
          {suggestions.goals.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-muted-foreground">No goal suggestions available at this time.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.goals.map(suggestion => (
                <Card key={suggestion.id}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start">
                      <Target className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                      <span>{suggestion.content}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{suggestion.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestion.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog open={isDialogOpen && selectedSuggestion?.id === suggestion.id} onOpenChange={(open) => {
                      setIsDialogOpen(open);
                      if (!open) setSelectedSuggestion(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedSuggestion(suggestion)}
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add Goal
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Suggested Goal</DialogTitle>
                          <DialogDescription>
                            Add this AI-suggested goal to your 12-week plan.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="py-4">
                          <h3 className="font-medium mb-2">Goal</h3>
                          <p className="text-sm mb-4">{suggestion.content}</p>
                          
                          <h3 className="font-medium mb-2">Why this matters</h3>
                          <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                        </div>
                        
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleApplySuggestion}>
                            Add to Plan
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
          {suggestions.strategies.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-muted-foreground">No strategy suggestions available at this time.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.strategies.map(suggestion => {
                const relatedGoal = currentPlan.goals.find(g => g.id === suggestion.goalId);
                
                return (
                  <Card key={suggestion.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start">
                        <ListChecks className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                        <span>{suggestion.content}</span>
                      </CardTitle>
                      {relatedGoal && (
                        <CardDescription className="flex items-center mt-1">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          For: {relatedGoal.content}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <Badge variant="outline">
                          {suggestion.frequency}x per week
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isDialogOpen && selectedSuggestion?.id === suggestion.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedSuggestion(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setSelectedSuggestion(suggestion)}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Strategy
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Suggested Strategy</DialogTitle>
                            <DialogDescription>
                              Add this AI-suggested strategy to your goal.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <h3 className="font-medium mb-2">Strategy</h3>
                            <p className="text-sm mb-4">{suggestion.content}</p>
                            
                            <h3 className="font-medium mb-2">Frequency</h3>
                            <p className="text-sm mb-4">{suggestion.frequency}x per week</p>
                            
                            <h3 className="font-medium mb-2">Target Goal</h3>
                            <p className="text-sm mb-4">{relatedGoal?.content || "Unknown goal"}</p>
                            
                            <h3 className="font-medium mb-2">Why this helps</h3>
                            <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleApplySuggestion}>
                              Add to Goal
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="indicators" className="pt-4">
          {suggestions.indicators.length === 0 ? (
            <div className="text-center p-6">
              <p className="text-muted-foreground">No indicator suggestions available at this time.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.indicators.map(suggestion => {
                const relatedGoal = currentPlan.goals.find(g => g.id === suggestion.goalId);
                
                return (
                  <Card key={suggestion.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start">
                        <BarChart2 className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                        <span>{suggestion.content}</span>
                      </CardTitle>
                      {relatedGoal && (
                        <CardDescription className="flex items-center mt-1">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          For: {relatedGoal.content}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <Badge variant="outline">
                          {suggestion.initialValue} → {suggestion.goalValue} {suggestion.metric}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                    </CardContent>
                    <CardFooter>
                      <Dialog open={isDialogOpen && selectedSuggestion?.id === suggestion.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedSuggestion(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setSelectedSuggestion(suggestion)}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Indicator
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Suggested Indicator</DialogTitle>
                            <DialogDescription>
                              Add this AI-suggested progress indicator to your goal.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <h3 className="font-medium mb-2">Indicator</h3>
                            <p className="text-sm mb-4">{suggestion.content}</p>
                            
                            <h3 className="font-medium mb-2">Measurement</h3>
                            <p className="text-sm mb-4">
                              From {suggestion.initialValue} to {suggestion.goalValue} {suggestion.metric}
                            </p>
                            
                            <h3 className="font-medium mb-2">Target Goal</h3>
                            <p className="text-sm mb-4">{relatedGoal?.content || "Unknown goal"}</p>
                            
                            <h3 className="font-medium mb-2">Why this matters</h3>
                            <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleApplySuggestion}>
                              Add to Goal
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
