"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { getPusherClient } from "@/lib/pusher-client";
import { toast } from "sonner";
import { Consultation } from "@/types";
import { useEffect } from "react";

interface ConsultationsState {
  consultations: Consultation[];
  currentPage: number;
  isLoading: boolean;
  exporting: boolean;
  updatingStatus: string | null;
  error: string | null;
  unreadConsultationCount: number;
  markConsultationRead: () => void;

  // Actions
  fetchConsultations: () => Promise<void>;
  addConsultation: (consultation: Consultation) => void;
  exportConsultations: () => Promise<void>;
  updateConsultationStatus: (
    id: string,
    status: "pending" | "attended"
  ) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setExporting: (exporting: boolean) => void;
  setUpdatingStatus: (id: string | null) => void;
  setError: (error: string | null) => void;
}

export const useConsultationsStore = create<ConsultationsState>()(
  persist(
    devtools(
      (set, get) => ({
        consultations: [],
        currentPage: 1,
        isLoading: true,
        exporting: false,
        updatingStatus: null,
        error: null,
        unreadConsultationCount: 0,

        fetchConsultations: async () => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch("/api/consultations");
            const data = await response.json();

            if (data.success) {
              set({ consultations: data.data, isLoading: false });
            } else {
              set({ error: "Failed to load consultations", isLoading: false });
            }
          } catch (error) {
            console.error("Error fetching consultations:", error);
            set({ error: "Failed to load consultations", isLoading: false });
          }
        },

        addConsultation: (consultation: Consultation) => {
          set((state) => ({
            consultations: [consultation, ...state.consultations],
            unreadConsultationCount: state.unreadConsultationCount + 1, // NEW
          }));
        },

        exportConsultations: async () => {
          set({ exporting: true });
          try {
            const response = await fetch("/api/consultations/export");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `consultations-${new Date().toISOString().split("T")[0]}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            toast.success("Consultations exported successfully");
          } catch (error) {
            console.error("Error exporting consultations:", error);
            toast.error("Failed to export consultations");
          } finally {
            set({ exporting: false });
          }
        },

        updateConsultationStatus: async (
          id: string,
          status: "pending" | "attended"
        ) => {
          const currentUpdatingStatus = get().updatingStatus;
          set({ updatingStatus: id });

          try {
            const res = await fetch(`/api/consultations/${id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: status }),
            });
            const result = await res.json();

            if (result.success) {
              set((state) => ({
                consultations: state.consultations.map((con) =>
                  con.id === id ? { ...con, status } : con
                ),
              }));
              toast.success("Status updated successfully!");
            } else {
              throw new Error(result.error || "Something went wrong");
            }
          } catch (error) {
            console.error("Error changing status:", error);
            toast.error("Failed to update status");
          } finally {
            set({ updatingStatus: null });
          }
        },

        setCurrentPage: (page: number) => set({ currentPage: page }),
        setExporting: (exporting: boolean) => set({ exporting }),
        setUpdatingStatus: (id: string | null) => set({ updatingStatus: id }),
        setError: (error: string | null) => set({ error }),
        markConsultationRead: () => set({ unreadConsultationCount: 0 }),
      }),
      { name: "consultations-store" }
    ),
    { name: "consultations-storage" }
  )
);

// Global Pusher singleton
class ConsultationsPusher {
  private static instance: ConsultationsPusher;
  private initialized = false;

  static getInstance() {
    if (!ConsultationsPusher.instance) {
      ConsultationsPusher.instance = new ConsultationsPusher();
    }
    return ConsultationsPusher.instance;
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

    channel.bind("new-consultation", (data: Consultation) => {
      console.log("New Consultation received:", data);
      useConsultationsStore.getState().addConsultation(data);
      toast.success("New consultation received!");
    });

    this.initialized = true;
  }
}

export const usePusherInit = () => {
  useEffect(() => {
    ConsultationsPusher.getInstance().initialize();
  }, []);
};
