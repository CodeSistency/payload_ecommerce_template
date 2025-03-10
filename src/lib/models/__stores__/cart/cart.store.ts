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
        (item: CartItem) => item[idPropFrom as keyof typeof item] === id
      );
      if (existingItem) {
        set((state) => ({
          data: {
            ...state.data,
            [system]: state.data[system].map((item: CartItem) =>
              item[idPropFrom as keyof typeof item] === id
                ? { ...item, quantity: item.quantity + data.quantity }
                : item
            ),
          },
        }));
      } else {
        const newItem = { [idPropFrom]: id, ...data };
        set((state) => ({
          data: { ...state.data, [system]: [...state.data[system], newItem] },
        }));
      }
    },
    deleteModelCart: (system, idPropFrom, id) => {
      const deleteCart = get().data[system];
    const index: number = deleteCart.findIndex(
      (obj: CartItem) => obj[idPropFrom as keyof typeof obj] === id
    );
      if (index !== -1) deleteCart.splice(index, 1);
      set((state) => ({
        data: { ...state.data, [system]: [...deleteCart] },
      }));
    },
    updateModelCart: (system, idPropFrom, id, data) => {
      set((state) => {
        const edit: CartItem[] = get().data[system].map((obj: CartItem) =>
          obj[idPropFrom as keyof typeof obj] === id ? data : obj
        );
        return { data: { ...state.data, [system]: [...edit] } };
      });
    },
    // Cart-specific method
    getCartTotal: () =>
      get().data.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
}));
