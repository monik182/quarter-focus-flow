
import React from "react";
import { Layout } from "@/components/Layout";
import { usePlan } from "@/context/PlanContext";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubscriptionGuard } from "@/components/SubscriptionGuard";

const Templates = () => {
  const { currentPlan } = usePlan();
  const navigate = useNavigate();

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
          <FileText className="inline-block mr-2 h-8 w-8" />
          Goal Templates
        </h1>
      </div>
      
      <SubscriptionGuard 
        feature="templates"
        title="Premium Feature: Goal Templates"
        description="Access a library of pre-built goal templates to jumpstart your planning process with a premium subscription."
      >
        <NeumorphicCard>
          <TemplateGallery />
        </NeumorphicCard>
      </SubscriptionGuard>
    </Layout>
  );
};

export default Templates;
