
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { usePlan } from "@/context/PlanContext";
import { formatDate, getPlanDurationLabel } from "@/lib/date-utils";
import { calculatePlanProgress, getCurrentWeek } from "@/lib/plan-utils";
import { Progress } from "@/components/ui/progress";
import { GoalCard } from "@/components/GoalCard";
import { Plus, Calendar, Target } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function PlanOverview() {
  const { currentPlan, updatePlan, createGoal } = usePlan();
  const [newGoalContent, setNewGoalContent] = useState("");
  const [vision, setVision] = useState(currentPlan?.vision || "");
  const [milestone, setMilestone] = useState(currentPlan?.milestone || "");
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  if (!currentPlan) return null;

  const progress = calculatePlanProgress(currentPlan);
  const currentWeek = getCurrentWeek(currentPlan);

  const handleSaveVision = () => {
    updatePlan({ vision, milestone });
    setIsEditingVision(false);
  };

  const handleCreateGoal = () => {
    if (newGoalContent.trim()) {
      createGoal(newGoalContent);
      setNewGoalContent("");
      setOpenDialog(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your 12-Week Plan</h1>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{getPlanDurationLabel(currentPlan.startDate, currentPlan.endDate)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Card className="bg-quarterFocus-accent-purple">
            <CardContent className="p-3">
              <div className="text-xs font-medium">Current Week</div>
              <div className="text-xl font-bold">{currentWeek} / 12</div>
            </CardContent>
          </Card>
          <Card className="bg-quarterFocus-accent-green">
            <CardContent className="p-3">
              <div className="text-xs font-medium">Progress</div>
              <div className="text-xl font-bold">{progress}%</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vision & Milestone</CardTitle>
            {!isEditingVision ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditingVision(true)}>
                Edit
              </Button>
            ) : (
              <Button size="sm" onClick={handleSaveVision}>
                Save
              </Button>
            )}
          </div>
          <CardDescription>Your long-term vision and 12-week milestone</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditingVision ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vision">Long-term Vision</Label>
                <Textarea
                  id="vision"
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  placeholder="What's your long-term vision? (1-3 years)"
                  className="min-h-[100px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="milestone">12-Week Milestone</Label>
                <Textarea
                  id="milestone"
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  placeholder="What do you want to achieve in the next 12 weeks?"
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4" /> Long-term Vision
                </h3>
                <p className="text-muted-foreground">
                  {vision || "No vision set yet. Click Edit to add your long-term vision."}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" /> 12-Week Milestone
                </h3>
                <p className="text-muted-foreground">
                  {milestone || "No milestone set yet. Click Edit to add your 12-week milestone."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Goals</h2>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-quarterFocus-purple hover:bg-quarterFocus-purple-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Goal</DialogTitle>
                <DialogDescription>
                  Add a new goal to your 12-week plan. Keep it specific and achievable.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal Description</Label>
                  <Textarea
                    id="goal"
                    value={newGoalContent}
                    onChange={(e) => setNewGoalContent(e.target.value)}
                    placeholder="Enter your goal here..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateGoal}>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {currentPlan.goals && currentPlan.goals.length > 0 ? (
            currentPlan.goals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
          ) : (
            <Card className="col-span-full border-dashed bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-center space-y-2">
                  <Target className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="font-semibold text-lg">No Goals Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Create goals to track your progress over the next 12 weeks.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => setOpenDialog(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Goal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
