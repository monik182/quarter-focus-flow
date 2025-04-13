
import React from "react";
import { Layout } from "@/components/Layout";
import { PlanOverview } from "@/components/PlanOverview";
import { CreatePlanForm } from "@/components/CreatePlanForm";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { usePlan } from "@/context/PlanContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";

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
        </div>
      )}
    </Layout>
  );
};

export default Index;
