
import React from "react";
import { Calendar, ChartPie, FileText, Lightbulb, Crown, Target } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const Features = () => (
  <section className="py-20 bg-slate-50">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
        <p className="text-xl text-muted-foreground">Powerful features to keep you on track</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={Calendar}
          title="12-Week Planning"
          description="Break down your annual goals into focused quarterly sprints for better results."
        />
        <FeatureCard
          icon={ChartPie}
          title="Progress Tracking"
          description="Visualize your progress with intuitive charts and weekly metrics."
        />
        <FeatureCard
          icon={FileText}
          title="Goal Templates"
          description="Jump-start your planning with pre-built goal templates for common objectives."
        />
        <FeatureCard
          icon={Lightbulb}
          title="AI Suggestions"
          description="Get intelligent recommendations for goals, strategies, and indicators."
        />
        <FeatureCard
          icon={Crown}
          title="Premium Features"
          description="Unlock advanced features with our Premium and Lifetime plans."
        />
        <FeatureCard
          icon={Target}
          title="Weekly Focus"
          description="Stay on track with clear weekly action items and progress checks."
        />
      </div>
    </div>
  </section>
);
