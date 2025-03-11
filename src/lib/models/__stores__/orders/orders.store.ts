import { create } from "zustand";
import { OrdersStore } from "./orders.types";


// Create the store with Zustand
export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  setOrders: (orders) => set({ orders }),
  fetchOrders: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate an API call to fetch orders for the user
      const response = await fetch(`/api/orders?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      set({ orders: data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error instanceof Error ? error.message : 'An error occurred' });
    }
  },
}));