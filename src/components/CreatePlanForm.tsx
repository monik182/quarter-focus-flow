
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePlan } from "@/context/PlanContext";
import { Calendar } from "@/components/ui/calendar";
import { addWeeks, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export function CreatePlanForm() {
  const { createNewPlan } = usePlan();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const endDate = addWeeks(startDate, 12);

  const handleCreatePlan = () => {
    createNewPlan(startDate);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your 12-Week Plan</CardTitle>
        <CardDescription>
          Set up a 12-week plan to achieve your goals with focus and clarity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="start-date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(startDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => date && setStartDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>End Date (12 weeks later)</Label>
          <Input 
            value={format(endDate, "PPP")} 
            disabled 
            className="bg-muted"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCreatePlan} className="w-full bg-quarterFocus-purple hover:bg-quarterFocus-purple-dark">
          Create My Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
