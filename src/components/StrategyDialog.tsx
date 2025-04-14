import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/context/PlanContext";
import { Strategy } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>(
    strategy?.weeks ? strategy.weeks.map(String) : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  );

  const handleSave = () => {
    if (!content.trim()) return;

    const strategyData = {
      content,
      frequency,
      weeks: selectedWeeks.map(Number).sort((a, b) => a - b)
    };

    if (strategy) {
      updateStrategy(strategy.id, strategyData);
    } else {
      createStrategy(goalId, strategyData);
    }
    
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setContent("");
    setFrequency(1);
    setSelectedWeeks(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  };

  const handleSelectAllWeeks = () => {
    setSelectedWeeks(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  };

  const handleClearWeeks = () => {
    setSelectedWeeks([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{strategy ? "Edit Strategy" : "Add Strategy"}</DialogTitle>
          <DialogDescription>
            {strategy
              ? "Update your strategy to better achieve your goal."
              : "Add a new strategy to help achieve your goal."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
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
            <input
              id="strategy-frequency"
              type="number"
              min={1}
              max={7}
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Which weeks will you perform this action?</Label>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectAllWeeks}
                >
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearWeeks}
                >
                  Clear All
                </Button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <ToggleGroup 
                type="multiple" 
                value={selectedWeeks}
                onValueChange={setSelectedWeeks}
                className="flex flex-wrap gap-2"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <ToggleGroupItem
                    key={i + 1}
                    value={(i + 1).toString()}
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                    aria-label={`Week ${i + 1}`}
                  >
                    {i + 1}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {selectedWeeks.length} of 12 weeks
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!content.trim() || selectedWeeks.length === 0}>
            {strategy ? "Update Strategy" : "Add Strategy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
