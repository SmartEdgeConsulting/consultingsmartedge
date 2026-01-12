"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getPusherClient } from "@/lib/pusher-client";
import { Registration } from "@/types";
import { toast } from "sonner";
import { useEffect } from "react";

interface RegistrationsState {
  registrations: Registration[];
  currentPage: number;
  loading: boolean;
  exporting: boolean;
  updatingStatus: string | null;
  error: string | null;
  unreadRegistrationCount: number;
  markRegistrationRead: () => void;

  // Actions
  fetchRegistrations: () => Promise<void>;
  addRegistration: (reg: Registration) => void;
  exportRegistrations: () => Promise<void>;
  updateRegistrationStatus: (
    id: string,
    status: "pending" | "accepted" | "rejected"
  ) => void;
  setCurrentPage: (page: number) => void;
  setExporting: (exporting: boolean) => void;
  setUpdatingStatus: (id: string | null) => void;
  setError: (error: string | null) => void;
}

export const useRegistrationsStore = create<RegistrationsState>()(
  persist(
    devtools(
      (set, get) => ({
        registrations: [],
        currentPage: 1,
        loading: true,
        exporting: false,
        updatingStatus: null,
        error: null,
        unreadRegistrationCount: 0,

        fetchRegistrations: async () => {
          set({ loading: true, error: null });

          try {
            const response = await fetch("/api/registrations");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.success) {
              set({ registrations: data.data, loading: false });
              console.log("Fetched registrations:", data.data);
            } else {
              const errorMsg = data.error || "Failed to load registrations";
              console.error("API Error:", data.details || errorMsg);
              set({ error: errorMsg, loading: false });
              toast.error(errorMsg);
            }
          } catch (error) {
            console.error("Error fetching registrations:", error);
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Failed to load registrations";
            set({ error: errorMessage, loading: false });
            toast.error(errorMessage);
          }
        },

        addRegistration: (reg: Registration) => {
          set((state) => ({
            registrations: [reg, ...state.registrations],
            unreadRegistrationCount: state.unreadRegistrationCount + 1,
          }));
        },

        exportRegistrations: async () => {
          const state = get();
          set({ exporting: true });

          try {
            const response = await fetch("/api/registrations/export");

            if (!response.ok) {
              throw new Error(`Export failed with status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Registrations exported successfully");
          } catch (error) {
            console.error("Error exporting registrations:", error);
            toast.error("Failed to export registrations");
          } finally {
            set({ exporting: false });
          }
        },

        updateRegistrationStatus: (
          id: string,
          status: "pending" | "accepted" | "rejected"
        ) => {
          set((state) => ({
            registrations: state.registrations.map((reg) =>
              reg.id === id ? { ...reg, status } : reg
            ),
          }));
        },

        setCurrentPage: (page: number) => set({ currentPage: page }),
        setExporting: (exporting: boolean) => set({ exporting }),
        setUpdatingStatus: (id: string | null) => set({ updatingStatus: id }),
        setError: (error: string | null) => set({ error }),
        markRegistrationRead: () => set({ unreadRegistrationCount: 0 }),
      }),
      { name: "registrations-store" }
    ),
    { name: "registrations-storage" }
  )
);

// Pusher - UNCHANGED
class RegistrationsPusher {
  private static instance: RegistrationsPusher;
  private initialized = false;

  static getInstance() {
    if (!RegistrationsPusher.instance) {
      RegistrationsPusher.instance = new RegistrationsPusher();
    }
    return RegistrationsPusher.instance;
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

    channel.bind("new-registration", (data: Registration) => {
      console.log("New Registration received:", data);
      useRegistrationsStore.getState().addRegistration(data);
    });

    this.initialized = true;
  }
}

export const usePusherInit = () => {
  useEffect(() => {
    RegistrationsPusher.getInstance().initialize();
  }, []);
};
