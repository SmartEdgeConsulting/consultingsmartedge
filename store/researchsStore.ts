"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getPusherClient } from "@/lib/pusher-client";
import { toast } from "sonner";
import { Research } from "@/types";
import { useEffect, useRef } from "react";

interface ResearchsState {
  research: Research[];
  currentPage: number;
  isLoading: boolean;
  exporting: boolean;
  error: string | null;
  unreadResearchCount: number;

  // Actions
  fetchResearchs: () => Promise<void>;
  addResearch: (research: Research) => void;
  exportResearchs: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  setExporting: (exporting: boolean) => void;
  setError: (error: string | null) => void;
  markResearchRead: () => void;
}

export const useResearchsStore = create<ResearchsState>()(
  persist(
    devtools(
      (set) => ({
        research: [],
        currentPage: 1,
        isLoading: true,
        exporting: false,
        error: null,
        unreadResearchCount: 0,

        fetchResearchs: async () => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch("/api/research");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
              set({ research: data.data, isLoading: false });
            } else {
              set({ 
                error: "Failed to load research requests",
                isLoading: false,
              });
              toast.error("Failed to load research requests");
            }
          } catch (error) {
            console.error("Error fetching research:", error);
            set({
              error: "Failed to load research requests",
              isLoading: false,
            });
            toast.error("Failed to load research requests");
          }
        },

        addResearch: (research: Research) => {
          set((state) => ({
            research: [research, ...state.research],
            unreadResearchCount: state.unreadResearchCount + 1,
          }));
          toast.success("New research request received!");
        },

        exportResearchs: async () => {
          set({ exporting: true });
          try {
            const response = await fetch("/api/research/export");
            if (!response.ok) {
              throw new Error(`Export failed: ${response.statusText}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `research-requests-${new Date().toISOString().split("T")[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Research requests exported successfully");
          } catch (error) {
            console.error("Error exporting research:", error);
            toast.error("Failed to export research requests");
          } finally {
            set({ exporting: false });
          }
        },

        setCurrentPage: (page: number) => set({ currentPage: page }),
        setExporting: (exporting: boolean) => set({ exporting }),
        setError: (error: string | null) => set({ error }),
        markResearchRead: () => set({ unreadResearchCount: 0 }),
      }),
      { name: "research-store" }
    ),
    {
      name: "research-storage",
      partialize: (state) => ({
        research: state.research,
        currentPage: state.currentPage,
      }), // Only persist research data and page
    }
  )
);

// Global Pusher singleton - improved
class ResearchPusher {
  private static instance: ResearchPusher;
  private initialized = false;

  static getInstance() {
    if (!ResearchPusher.instance) {
      ResearchPusher.instance = new ResearchPusher();
    }
    return ResearchPusher.instance;
  }

  initialize() {
    if (this.initialized) return;

    const pusher = getPusherClient();
    if (!pusher) {
      console.error("Pusher client not initialized");
      return;
    }

    const channel = pusher.subscribe("admin-dashboard");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to admin-dashboard channel");
    });

    channel.bind("new-research", (data: Research) => {
      console.log("New research received:", data);
      useResearchsStore.getState().addResearch(data);
    });

    this.initialized = true;
  }

  destroy() {
    if (this.initialized) {
      const pusher = getPusherClient();
      if (pusher) {
        pusher.unsubscribe("admin-dashboard");
      }
      this.initialized = false;
    }
  }
}

// Hook for initializing Pusher
export const usePusherInit = () => {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (initializedRef.current) return;

    const pusher = ResearchPusher.getInstance();
    pusher.initialize();
    initializedRef.current = true;

    return () => {
      // Optional: cleanup on unmount
      // Be careful with this in development due to StrictMode
      // pusher.destroy();
    };
  }, []); // Empty dependency array - only run once
};