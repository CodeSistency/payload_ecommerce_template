import { Order } from "@/payload-types";

export interface OrdersStore {
    orders: Order[];
    isLoading: boolean;
    error: string | null;
    setOrders: (orders: Order[]) => void;
    fetchOrders: (userId: string) => Promise<void>;
  }