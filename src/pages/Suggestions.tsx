
import React from "react";
import { Layout } from "@/components/Layout";
import { usePlan } from "@/context/PlanContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { AISuggestions } from "@/components/AISuggestions";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubscriptionGuard } from "@/components/SubscriptionGuard";

const Suggestions = () => {
  const { currentPlan, isLoading } = usePlan();
  const navigate = useNavigate();

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

  if (!currentPlan) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <NeumorphicCard elevated className="max-w-2xl mb-8 text-center">
            <h1 className="text-4xl font-bold mb-6 gradient-text">
              Create a Plan First
            </h1>
            <p className="text-muted-foreground mb-8 text-lg">
              You need to create a 12-week plan before you can get AI suggestions.
            </p>
            <Button onClick={() => navigate("/")}>
              Go to Dashboard
            </Button>
          </NeumorphicCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold gradient-text">
          <Lightbulb className="inline-block mr-2 h-8 w-8" />
          AI Suggestions
        </h1>
      </div>
      
      <SubscriptionGuard 
        feature="ai-suggestions"
        title="Premium Feature: AI Suggestions"
        description="Get intelligent goal and strategy recommendations powered by AI with a premium subscription."
      >
        <NeumorphicCard>
          <AISuggestions />
        </NeumorphicCard>
      </SubscriptionGuard>
    </Layout>
  );
};

export default Suggestions;
