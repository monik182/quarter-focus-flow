
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "./PlanContext";
import { useToast } from "@/components/ui/use-toast";

// Placeholder for Supabase auth integration
const hasAuth = false; // Replace with actual auth check once Supabase is connected

export type SubscriptionTier = "free" | "premium" | "lifetime";

interface SubscriptionContextProps {
  tier: SubscriptionTier;
  isLoading: boolean;
  hasActiveSubscription: boolean;
  canAccessPremiumFeature: (feature: string) => boolean;
  subscriptionEndsAt: Date | null;
  refreshSubscription: () => Promise<void>;
  redirectToPricing: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(undefined);

const PREMIUM_FEATURES = [
  "progress-view",
  "templates",
  "ai-suggestions",
  "unlimited-plans"
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subscriptionEndsAt, setSubscriptionEndsAt] = useState<Date | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const hasActiveSubscription = tier === "premium" || tier === "lifetime";

  // Placeholder for subscription check
  // To be replaced with actual Stripe check via Supabase Edge Function
  useEffect(() => {
    const checkSubscription = async () => {
      setIsLoading(true);
      try {
        // Placeholder for subscription check API call
        // This will be replaced with a call to a Supabase Edge Function
        // that connects to Stripe to check subscription status
        
        // Mock response for development until Supabase/Stripe is connected
        const mockResponse = {
          tier: "free" as SubscriptionTier,
          subscriptionEndsAt: null as Date | null
        };
        
        setTier(mockResponse.tier);
        setSubscriptionEndsAt(mockResponse.subscriptionEndsAt);
      } catch (error) {
        console.error("Failed to check subscription:", error);
        toast({
          title: "Error",
          description: "Failed to verify subscription status",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (hasAuth) {
      checkSubscription();
    } else {
      // If no auth, default to free tier
      setTier("free");
      setIsLoading(false);
    }
  }, [toast]);

  const refreshSubscription = async () => {
    setIsLoading(true);
    try {
      // This will be replaced with actual implementation
      // when Supabase and Stripe are connected
      
      // For now, just simulate a refresh
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to refresh subscription:", error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const canAccessPremiumFeature = (feature: string) => {
    if (!PREMIUM_FEATURES.includes(feature)) return true;
    return hasActiveSubscription;
  };

  const redirectToPricing = () => {
    navigate("/pricing");
  };

  const value = {
    tier,
    isLoading,
    hasActiveSubscription,
    canAccessPremiumFeature,
    subscriptionEndsAt,
    refreshSubscription,
    redirectToPricing
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = (): SubscriptionContextProps => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
