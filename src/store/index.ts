import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  selectedProduct: any | null;
  selectedProductId: string;
  cartItems: any;
  setCartItems: (cartItems: any | null) => void;
};

const useStore = create(
  persist<Store>(
    (set, get) => ({
      selectedProduct: null,
      selectedProductId: '',
      cartItems: [],
      setCartItems: (cartItems) => set((state) => ({ ...state, cartItems: cartItems })),
    }),
    {
      name: "store", // Set a name for your persisted store
      //storage: createJSONStorage(()=> sessionStorage) // (optional) by default, 'localStorage' is used
    }
  )
);

export default useStore;
