
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen soft-gradient flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto">
          <div className="flex h-20 items-center px-6 md:px-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-300 to-indigo-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                QF
              </div>
              <h1 className="text-2xl font-bold gradient-text">QuarterFocus</h1>
            </div>
            <div className="ml-auto flex items-center gap-4">
              {/* Additional header elements could go here */}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8 md:py-12 px-6 md:px-8">
          {children}
        </div>
      </main>
      <footer className="py-6 px-6 md:px-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} QuarterFocus. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Plan your achievements in 12-week cycles
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
