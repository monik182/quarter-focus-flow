
import React from "react";
import { Target, AlignStartHorizontal, Milestone } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const HowItWorks = () => (
  <section className="py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">How QuarterFocus Works</h2>
      <p className="text-xl text-muted-foreground">Simple steps to achieve your goals</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard
        icon={Target}
        title="Set Your Goals"
        description="Define your quarterly objectives and break them down into actionable strategies."
      />
      <FeatureCard
        icon={AlignStartHorizontal}
        title="Track Progress"
        description="Monitor your progress with measurable indicators and weekly check-ins."
      />
      <FeatureCard
        icon={Milestone}
        title="Achieve Results"
        description="Stay focused and motivated with our 12-week goal achievement system."
      />
    </div>
  </section>
);
