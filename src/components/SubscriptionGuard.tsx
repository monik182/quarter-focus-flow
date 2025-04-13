
import React from "react";
import { useSubscription } from "@/context/SubscriptionContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";

interface SubscriptionGuardProps {
  feature: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({
  feature,
  children,
  title = "Premium Feature",
  description = "This feature is available to premium subscribers only."
}) => {
  const { canAccessPremiumFeature, redirectToPricing } = useSubscription();

  if (canAccessPremiumFeature(feature)) {
    return <>{children}</>;
  }

  return (
    <NeumorphicCard className="flex flex-col items-center justify-center p-8 text-center">
      <Lock className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button onClick={redirectToPricing} className="flex items-center gap-2">
        <Crown className="h-4 w-4" />
        Upgrade to Premium
      </Button>
    </NeumorphicCard>
  );
};
