"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface Users {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string;
  imageUrl: string;
  emailVerified: "false" | "true";
  createdAt: string;
  updatedAt: string;
}
interface UsersState {
  users: Users[];
  userCount: number;
  unreadUserCount: number;  // ✅ Added
  weeklyChange: number;
  isLoading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  fetchUserGrowth: () => Promise<void>;  // ✅ Fixed
  setUsers: (users: Users[]) => void;
  addUser: (user: Users) => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    devtools(
      (set) => ({
        users: [],
        userCount: 0,
        unreadUserCount: 0,  // ✅ Added
        weeklyChange: 0,
        isLoading: false,
        error: null,

        fetchUsers: async () => {
          set({ isLoading: true, error: null });
          try {
            const response = await fetch("/api/users");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            console.log("Fetched users:", data.data);

            if (data.success) {
              set({
                users: data.data,
                userCount: data.count || data.data.length,
                isLoading: false,
              });
            } else {
              set({ error: "Failed to load users", isLoading: false });
            }
          } catch (error) {
            console.error("Error fetching users:", error);
            set({ error: "Failed to load users", isLoading: false });
          }
        },

        // ✅ FIXED: Proper error handling + unread count
        fetchUserGrowth: async () => {
          try {
            const response = await fetch("/api/users/growth");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            if (data.success) {
              set({
                userCount: data.data.totalCount,
                unreadUserCount: data.data.newThisWeek,  // ✅ Use new users
                weeklyChange: data.data.weeklyChange,
              });
            }
          } catch (error) {
            console.error("Growth fetch failed:", error);
          }
        },

        setUsers: (users: Users[]) => {
          set({
            users,
            userCount: users.length,
          });
        },

        addUser: (user: Users) => {
          set((state) => ({
            users: [user, ...state.users],
            userCount: state.userCount + 1,
            unreadUserCount: state.unreadUserCount + 1,  // ✅ Count as unread
          }));
        },
      }),
      { name: "users-store" }
    ),
    { name: "users-storage" }
  )
);
