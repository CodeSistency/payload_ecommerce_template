// src/stores/useCartStore.ts
import { create } from "zustand";
import { CartItem, ModelCartStoreType } from "./cart.types";

export const useCartStore = create<ModelCartStoreType>((set, get) => ({
  data: { cart: [] },
  actions: {
    setModelCart: (system, data) =>
      set((state) => ({
        data: { ...state.data, [system]: data },
      })),

    addModelCart: (system, data) =>
      set((state) => ({
        data: { ...state.data, [system]: [...state.data[system], ...data] },
      })),

    createModelCart: (system, idPropFrom, id, data) => {
      const existingItem = get().data[system].find(
        (item: CartItem) => item[idPropFrom as keyof CartItem] === id
      );
      if (existingItem) {
        set((state) => ({
          data: {
            ...state.data,
            [system]: state.data[system].map((item: CartItem) =>
              item[idPropFrom as keyof CartItem] === id
                ? { ...item, quantity: item.quantity + data.quantity }
                : item
            ),
          },
        }));
      } else {
        set((state) => ({
          data: { ...state.data, [system]: [...state.data[system], data] },
        }));
      }
    },

    deleteModelCart: (system, idPropFrom, id) => {
      set((state) => ({
        data: {
          ...state.data,
          [system]: state.data[system].filter(
            (item: CartItem) => item[idPropFrom as keyof CartItem] !== id
          ),
        },
      }));
    },

    updateModelCart: (system, idPropFrom, id, data) => {
      set((state) => ({
        data: {
          ...state.data,
          [system]: state.data[system].map((item: CartItem) =>
            item[idPropFrom as keyof CartItem] === id ? data : item
          ),
        },
      }));
    },

    getCartTotal: () =>
      get().data.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
}));
