
import React from "react";
import { Layout } from "@/components/Layout";
import { PlanOverview } from "@/components/PlanOverview";
import { CreatePlanForm } from "@/components/CreatePlanForm";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { usePlan } from "@/context/PlanContext";

const Index = () => {
  const { currentPlan, isLoading } = usePlan();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded-md"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {!currentPlan ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="text-center max-w-2xl mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-quarterFocus-purple-light to-quarterFocus-purple-dark bg-clip-text text-transparent">
              Welcome to QuarterFocus
            </h1>
            <p className="text-muted-foreground mb-6">
              Break down your annual goals into powerful 12-week cycles. QuarterFocus helps you stay on track with your most important objectives through focused planning and consistent execution.
            </p>
          </div>
          <CreatePlanForm />
        </div>
      ) : (
        <div className="space-y-8">
          <PlanOverview />
          <WeeklyProgress />
        </div>
      )}
    </Layout>
  );
};

export default Index;
