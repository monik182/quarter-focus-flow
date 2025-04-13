
import React from "react";
import { Layout } from "@/components/Layout";
import { PlanOverview } from "@/components/PlanOverview";
import { CreatePlanForm } from "@/components/CreatePlanForm";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { usePlan } from "@/context/PlanContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChartPie, FileText, Lightbulb } from "lucide-react";

const Index = () => {
  const { currentPlan, isLoading } = usePlan();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-blue-100 rounded-full mb-4"></div>
            <div className="h-4 w-32 bg-purple-100 rounded-full"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!currentPlan ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <NeumorphicCard elevated className="max-w-2xl mb-8 text-center">
            <h1 className="text-4xl font-bold mb-6 gradient-text">
              Welcome to QuarterFocus
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Break down your annual goals into powerful 12-week cycles. QuarterFocus helps you stay on track with your most important objectives through focused planning and consistent execution.
            </p>
            <div className="mt-4">
              <CreatePlanForm />
            </div>
          </NeumorphicCard>
        </div>
      ) : (
        <div className="space-y-8">
          <NeumorphicCard>
            <PlanOverview />
          </NeumorphicCard>
          <NeumorphicCard>
            <WeeklyProgress />
          </NeumorphicCard>
          
          {/* Feature Links */}
          <div className="grid gap-4 md:grid-cols-3">
            <NeumorphicCard className="flex flex-col items-center text-center p-6">
              <ChartPie className="h-12 w-12 mb-4 text-purple-500" />
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-muted-foreground mb-4">
                View charts and trends of your indicators to see your progress over time.
              </p>
              <Button asChild className="mt-auto">
                <Link to="/indicators">View Indicators</Link>
              </Button>
            </NeumorphicCard>
            
            <NeumorphicCard className="flex flex-col items-center text-center p-6">
              <FileText className="h-12 w-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Goal Templates</h3>
              <p className="text-muted-foreground mb-4">
                Browse pre-built goal templates for common objectives and add them to your plan.
              </p>
              <Button asChild className="mt-auto">
                <Link to="/templates">Browse Templates</Link>
              </Button>
            </NeumorphicCard>
            
            <NeumorphicCard className="flex flex-col items-center text-center p-6">
              <Lightbulb className="h-12 w-12 mb-4 text-yellow-500" />
              <h3 className="text-xl font-bold mb-2">AI Suggestions</h3>
              <p className="text-muted-foreground mb-4">
                Get intelligent suggestions for goals, strategies, and indicators based on your plan.
              </p>
              <Button asChild className="mt-auto">
                <Link to="/suggestions">Get Suggestions</Link>
              </Button>
            </NeumorphicCard>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
