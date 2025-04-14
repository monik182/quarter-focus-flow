
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";

export const CallToAction = () => (
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
