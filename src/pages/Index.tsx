import React from "react";
import { Layout } from "@/components/Layout";
import { PlanOverview } from "@/components/PlanOverview";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { usePlan } from "@/context/PlanContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { LandingHero } from "@/components/landing/LandingHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { CallToAction } from "@/components/landing/CallToAction";

const Index = () => {
  const { currentPlan, isLoading } = usePlan();
  const { hasActiveSubscription } = useSubscription();

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
        <div>
          <LandingHero />
          <HowItWorks />
          <Features />
          <CallToAction />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {!hasActiveSubscription && (
          <NeumorphicCard className="bg-gradient-to-r from-purple-50 to-blue-50 p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="md:flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">Unlock Premium Features</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Upgrade to access progress tracking, goal templates, AI suggestions, and more!
                </p>
              </div>
              <Button asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </NeumorphicCard>
        )}
        
        <NeumorphicCard>
          <PlanOverview />
        </NeumorphicCard>
        <NeumorphicCard>
          <WeeklyProgress />
        </NeumorphicCard>
        
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
            {!hasActiveSubscription && (
              <div className="text-xs text-primary mt-2 flex items-center gap-1">
                <Crown className="h-3 w-3" /> Premium Feature
              </div>
            )}
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
            {!hasActiveSubscription && (
              <div className="text-xs text-primary mt-2 flex items-center gap-1">
                <Crown className="h-3 w-3" /> Premium Feature
              </div>
            )}
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
            {!hasActiveSubscription && (
              <div className="text-xs text-primary mt-2 flex items-center gap-1">
                <Crown className="h-3 w-3" /> Premium Feature
              </div>
            )}
          </NeumorphicCard>
        </div>
        
        {!hasActiveSubscription && (
          <NeumorphicCard className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <Crown className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Ready to unlock the full experience?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get unlimited plans, progress tracking, goal templates, and AI-powered suggestions with QuarterFocus Premium.
            </p>
            <Button asChild size="lg">
              <Link to="/pricing">Upgrade Now</Link>
            </Button>
          </NeumorphicCard>
        )}
      </div>
    </Layout>
  );
};

export default Index;
