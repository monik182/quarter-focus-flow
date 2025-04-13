
import React from "react";
import { Layout } from "@/components/Layout";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";
import { Check, X, Crown, Infinity, CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/context/SubscriptionContext";
import { useNavigate } from "react-router-dom";

const PricingFeature = ({ included, children }: { included: boolean; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 py-2">
    {included ? (
      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
    ) : (
      <X className="h-5 w-5 text-red-500 flex-shrink-0" />
    )}
    <span className="text-sm">{children}</span>
  </div>
);

const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  current = false,
  icon: Icon,
  onSubscribe,
  buttonText = "Subscribe"
}: {
  name: string;
  price: string;
  description: string;
  features: { text: string; included: boolean }[];
  highlighted?: boolean;
  current?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  onSubscribe: () => void;
  buttonText?: string;
}) => (
  <NeumorphicCard 
    className={`relative flex flex-col h-full ${highlighted ? "border-2 border-primary" : ""}`}
  >
    {current && (
      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-md rounded-tr-md">
        Current Plan
      </div>
    )}
    <div className="p-6 flex-grow">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-6 w-6 ${highlighted ? "text-primary" : "text-muted-foreground"}`} />
        <h3 className="text-xl font-bold">{name}</h3>
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold">{price}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-1">
        {features.map((feature, i) => (
          <PricingFeature key={i} included={feature.included}>
            {feature.text}
          </PricingFeature>
        ))}
      </div>
    </div>
    <div className="p-6 pt-0">
      <Button 
        onClick={onSubscribe} 
        className="w-full" 
        variant={highlighted ? "default" : "outline"}
        disabled={current}
      >
        {current ? "Current Plan" : buttonText}
      </Button>
    </div>
  </NeumorphicCard>
);

const Pricing = () => {
  const { tier, isLoading } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = (planType: "monthly" | "lifetime" | "free") => {
    if (planType === "free") {
      // For free tier, no payment required
      navigate("/");
      toast({
        title: "Free Plan Selected",
        description: "You are now on the free plan.",
      });
      return;
    }

    // This would integrate with Stripe via Supabase Edge Functions
    // For now, show a placeholder toast
    toast({
      title: "Stripe Integration Required",
      description: "Please connect Supabase and Stripe to enable payments.",
    });
  };

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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Select the plan that works best for your goal planning needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <PricingTier
            name="Free"
            price="$0"
            description="Basic goal planning"
            icon={X}
            current={tier === "free"}
            onSubscribe={() => handleSubscribe("free")}
            buttonText="Start Free"
            features={[
              { text: "1 Plan only", included: true },
              { text: "Basic goal tracking", included: true },
              { text: "Limited to 3 goals", included: true },
              { text: "Progress visualization", included: false },
              { text: "Goal templates", included: false },
              { text: "AI suggestions", included: false },
              { text: "Unlimited plans", included: false },
            ]}
          />

          <PricingTier
            name="Premium"
            price="$5/month"
            description="7-day free trial"
            icon={Crown}
            highlighted
            current={tier === "premium"}
            onSubscribe={() => handleSubscribe("monthly")}
            features={[
              { text: "Unlimited plans", included: true },
              { text: "Advanced goal tracking", included: true },
              { text: "Unlimited goals", included: true },
              { text: "Progress visualization", included: true },
              { text: "Goal templates", included: true },
              { text: "AI suggestions", included: true },
              { text: "Priority support", included: true },
            ]}
          />

          <PricingTier
            name="Lifetime"
            price="$49"
            description="One-time payment"
            icon={Infinity}
            current={tier === "lifetime"}
            onSubscribe={() => handleSubscribe("lifetime")}
            buttonText="Buy Once"
            features={[
              { text: "Unlimited plans", included: true },
              { text: "Advanced goal tracking", included: true },
              { text: "Unlimited goals", included: true },
              { text: "Progress visualization", included: true },
              { text: "Goal templates", included: true },
              { text: "AI suggestions", included: true },
              { text: "Priority support", included: true },
              { text: "Free updates forever", included: true },
            ]}
          />
        </div>

        <NeumorphicCard className="text-center p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Secure Payments</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            All payments are processed securely through Stripe. We never store your payment information.
          </p>
        </NeumorphicCard>
      </div>
    </Layout>
  );
};

export default Pricing;
