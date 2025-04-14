import React from "react";
import { Layout } from "@/components/Layout";
import { PlanOverview } from "@/components/PlanOverview";
import { CreatePlanForm } from "@/components/CreatePlanForm";
import { WeeklyProgress } from "@/components/WeeklyProgress";
import { usePlan } from "@/context/PlanContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChartPie, FileText, Lightbulb, Crown, Milestone, Target, Calendar, ArrowRight, PlayCircle, AlignStartHorizontal } from "lucide-react";

const LandingHero = () => (
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

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <NeumorphicCard className="p-6">
    <div className="flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </NeumorphicCard>
);

const HowItWorks = () => (
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

const Features = () => (
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

const CallToAction = () => (
  <section className="py-20">
    <NeumorphicCard elevated className="max-w-4xl mx-auto text-center p-12">
      <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Goals?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Join thousands of users who are transforming their goals into reality with QuarterFocus.
      </p>
      <Button size="lg" asChild>
        <Link to="/pricing">
          Get Started Now <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </NeumorphicCard>
  </section>
);

const Index = () => {
  const { currentPlan, isLoading } = usePlan();
  const { tier, hasActiveSubscription } = useSubscription();

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
