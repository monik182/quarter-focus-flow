
import React from "react";
import { LucideIcon } from "lucide-react";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
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
