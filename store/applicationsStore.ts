"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getPusherClient } from "@/lib/pusher-client";
import { Application } from "@/types";
import { useEffect } from "react";

interface ApplicationsState {
  applications: Application[];
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  unreadApplicationCount: number;
  markApplicationRead: () => void;

  fetchApplications: () => Promise<void>;
  addApplication: (app: Application) => void;
  setCurrentPage: (page: number) => void;
  setError: (error: string | null) => void;
}

export const useApplicationsStore = create<ApplicationsState>()(
  persist(
    devtools(
      (set) => ({
        applications: [],
        currentPage: 1,
        isLoading: true,
        error: null,
        unreadApplicationCount: 0,

        fetchApplications: async () => {
          set({ isLoading: true, error: null });

          try {
            const response = await fetch("/api/applications");
            const data = await response.json();

            if (data.success) {
              set({ applications: data.data, isLoading: false });
              console.log("Fetched applications:", data.data);
            } else {
              set({ error: "Failed to load applications", isLoading: false });
            }
          } catch (error) {
            console.error("Error fetching applications:", error);
            set({ error: "Failed to load applications", isLoading: false });
          }
        },

        addApplication: (app: Application) => {
          set((state) => ({
            applications: [app, ...state.applications],
            unreadApplicationCount: state.unreadApplicationCount + 1,
          }));
        },

        setCurrentPage: (page: number) => set({ currentPage: page }),
        setError: (error: string | null) => set({ error }),
        markApplicationRead: () => set({ unreadApplicationCount: 0 }),
      }),
      { name: "applications-store" }
    ),
    { name: "applications-storage" }
  )
);

class ApplicationsPusher {
  private static instance: ApplicationsPusher;
  private initialized = false;

  static getInstance() {
    if (!ApplicationsPusher.instance) {
      ApplicationsPusher.instance = new ApplicationsPusher();
    }
    return ApplicationsPusher.instance;
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
      console.log("Successfully subscribed to admin-dashboard");
    });

    channel.bind("new-application", (data: Application) => {
      console.log("New Application received:", data);
      useApplicationsStore.getState().addApplication(data);
    });

    this.initialized = true;
  }
}

export const usePusherInit = () => {
  useEffect(() => {
    ApplicationsPusher.getInstance().initialize();
  }, []);
};
