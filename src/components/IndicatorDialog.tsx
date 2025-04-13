
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/PlanContext";
import { Indicator } from "@/types";

interface IndicatorDialogProps {
  goalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  indicator?: Indicator;
}

export function IndicatorDialog({ goalId, open, onOpenChange, indicator }: IndicatorDialogProps) {
  const { createIndicator, updateIndicator } = usePlan();
  const [content, setContent] = useState(indicator?.content || "");
  const [metric, setMetric] = useState(indicator?.metric || "");
  const [initialValue, setInitialValue] = useState(indicator?.initialValue || 0);
  const [goalValue, setGoalValue] = useState(indicator?.goalValue || 0);

  const handleSave = () => {
    if (!content.trim() || !metric.trim()) return;

    if (indicator) {
      updateIndicator(indicator.id, { content, metric, initialValue, goalValue });
    } else {
      createIndicator(goalId, { content, metric, initialValue, goalValue });
    }
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setContent("");
    setMetric("");
    setInitialValue(0);
    setGoalValue(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{indicator ? "Edit Indicator" : "Add Indicator"}</DialogTitle>
          <DialogDescription>
            {indicator
              ? "Update the measurable indicator for your goal."
              : "Add a measurable indicator to track progress on your goal."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="indicator-content">What will you measure?</Label>
            <Textarea
              id="indicator-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g., Weight, Pages read, Revenue"
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="indicator-metric">Unit of measurement</Label>
            <Input
              id="indicator-metric"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              placeholder="e.g., kg, pages, dollars"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="indicator-initial">Starting value</Label>
              <Input
                id="indicator-initial"
                type="number"
                value={initialValue}
                onChange={(e) => setInitialValue(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="indicator-goal">Target value</Label>
              <Input
                id="indicator-goal"
                type="number"
                value={goalValue}
                onChange={(e) => setGoalValue(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {indicator ? "Update Indicator" : "Add Indicator"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
