
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-quarterFocus-purple-light to-quarterFocus-purple-dark flex items-center justify-center text-white font-bold text-lg">
              QF
            </div>
            <h1 className="text-xl font-semibold">QuarterFocus</h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            {/* Additional header elements could go here */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8 px-4 md:px-6">
          {children}
        </div>
      </main>
      <footer className="border-t py-4 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} QuarterFocus. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              Plan your achievements in 12-week cycles
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
