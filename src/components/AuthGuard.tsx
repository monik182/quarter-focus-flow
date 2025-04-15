
import React from "react";
import { Navigate } from "react-router-dom";
import { useSubscription } from "@/context/SubscriptionContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // TODO: Replace this with actual auth check from Supabase
  const isAuthenticated = localStorage.getItem("dev_mode") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
