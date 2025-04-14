
import React from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export const LandingHero = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
      Transform Your Goals into Reality
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">
      Break down your annual goals into powerful 12-week cycles. QuarterFocus helps you stay on track with focused planning and consistent execution.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Button size="lg" className="text-lg px-8">
        Get Started Free
      </Button>
      <Button size="lg" variant="outline" className="text-lg px-8">
        Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
      </Button>
    </div>
  </div>
);
