
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, BarChart2, ListChecks, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { Goal } from "@/types";
import { calculateGoalProgress } from "@/lib/plan-utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StrategyDialog } from "@/components/StrategyDialog";
import { IndicatorDialog } from "@/components/IndicatorDialog";
import { usePlan } from "@/context/PlanContext";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const { updateGoal, deleteGoal } = usePlan();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStrategyDialogOpen, setIsStrategyDialogOpen] = useState(false);
  const [isIndicatorDialogOpen, setIsIndicatorDialogOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(goal.content);
  const [isOpen, setIsOpen] = useState(false);

  const progress = calculateGoalProgress(goal);
  const strategiesCount = goal.strategies?.length || 0;
  const indicatorsCount = goal.indicators?.length || 0;

  const handleUpdateGoal = () => {
    if (editedContent.trim()) {
      updateGoal(goal.id, { content: editedContent });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteGoal = () => {
    deleteGoal(goal.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{goal.content}</CardTitle>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Progress value={progress} className="h-2 flex-grow" />
          <span className="text-xs font-medium">{progress}%</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex gap-2 text-xs mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <ListChecks className="h-3 w-3" />
            {strategiesCount} {strategiesCount === 1 ? "Strategy" : "Strategies"}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <BarChart2 className="h-3 w-3" />
            {indicatorsCount} {indicatorsCount === 1 ? "Indicator" : "Indicators"}
          </Badge>
        </div>
      </CardContent>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="px-4">
        {(goal.strategies?.length > 0 || goal.indicators?.length > 0) && (
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex w-full justify-center">
              {isOpen ? (
                <ChevronUp className="h-4 w-4 opacity-50" />
              ) : (
                <ChevronDown className="h-4 w-4 opacity-50" />
              )}
            </Button>
          </CollapsibleTrigger>
        )}
        
        <CollapsibleContent className="space-y-4 pt-2">
          {goal.strategies && goal.strategies.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <ListChecks className="h-3 w-3 mr-1" /> Strategies
              </h4>
              <ul className="space-y-1">
                {goal.strategies.map(strategy => (
                  <li key={strategy.id} className="text-xs text-muted-foreground">
                    • {strategy.content} ({strategy.frequency}x/week)
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {goal.indicators && goal.indicators.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <BarChart2 className="h-3 w-3 mr-1" /> Indicators
              </h4>
              <ul className="space-y-1">
                {goal.indicators.map(indicator => (
                  <li key={indicator.id} className="text-xs text-muted-foreground">
                    • {indicator.content}: {indicator.initialValue} → {indicator.goalValue} {indicator.metric}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setIsStrategyDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1" /> Strategy
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setIsIndicatorDialogOpen(true)}
        >
          <Plus className="h-3 w-3 mr-1" /> Indicator
        </Button>
      </CardFooter>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>
              Update your goal description to better reflect what you want to achieve.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-goal">Goal Description</Label>
              <Textarea
                id="edit-goal"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Goal Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this goal? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteGoal}
            >
              Delete Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Strategy Dialog */}
      <StrategyDialog 
        goalId={goal.id} 
        open={isStrategyDialogOpen} 
        onOpenChange={setIsStrategyDialogOpen} 
      />

      {/* Indicator Dialog */}
      <IndicatorDialog 
        goalId={goal.id} 
        open={isIndicatorDialogOpen} 
        onOpenChange={setIsIndicatorDialogOpen} 
      />
    </Card>
  );
}
