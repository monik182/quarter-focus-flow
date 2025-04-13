
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/PlanContext";
import { Strategy } from "@/types";

interface StrategyDialogProps {
  goalId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  strategy?: Strategy;
}

export function StrategyDialog({ goalId, open, onOpenChange, strategy }: StrategyDialogProps) {
  const { createStrategy, updateStrategy } = usePlan();
  const [content, setContent] = useState(strategy?.content || "");
  const [frequency, setFrequency] = useState(strategy?.frequency || 1);

  const handleSave = () => {
    if (!content.trim()) return;

    if (strategy) {
      updateStrategy(strategy.id, { content, frequency });
    } else {
      createStrategy(goalId, { content, frequency });
    }
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setContent("");
    setFrequency(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{strategy ? "Edit Strategy" : "Add Strategy"}</DialogTitle>
          <DialogDescription>
            {strategy
              ? "Update your strategy to better achieve your goal."
              : "Add a new strategy to help achieve your goal."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="strategy-content">What action will you take?</Label>
            <Textarea
              id="strategy-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g., Exercise for 30 minutes"
              className="min-h-[80px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="strategy-frequency">How many times per week?</Label>
            <Input
              id="strategy-frequency"
              type="number"
              min={1}
              max={7}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {strategy ? "Update Strategy" : "Add Strategy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
