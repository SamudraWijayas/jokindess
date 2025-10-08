// app/_components/ClientLayout.tsx
"use client";
import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./DarkModeProvider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <DarkModeProvider>
        <Toaster />
        <div className="fixed inset-0 overflow-hidden -z-10 dark:hidden">
          <div
            className="w-[150%] h-[150%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-60"
            style={{
              animation: "meshMoveMulti 15s ease-in-out infinite",
              backgroundImage: `
        radial-gradient(circle at 30% 30%, #bbf7d0, transparent 60%),
        radial-gradient(circle at 70% 40%, #86efac, transparent 60%),
        radial-gradient(circle at 50% 80%, #4ade80, transparent 60%)`,
            }}
          />
        </div>

        {children}
      </DarkModeProvider>
    </HeroUIProvider>
  );
}
