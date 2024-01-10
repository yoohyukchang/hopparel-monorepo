import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Design, User } from "./types";

type State = {
  designs: Design[];
  user: User | null;
  selectedProductType: string | null;
};

type Action = {
  setDesigns: (designs: Design[]) => void;
  removeDesign: (id: string) => void;
  addDesign: (design: Design) => void;
  updateDesign: (id: string, newProductType: string, newImage: string) => void;
  getDesignById: (id: string) => Design | undefined;

  setUser: (user: User) => void;
  clearUser: () => void;

  setSelectedProductType: (productType: string) => void;
  clearSelectedProductType: () => void;
};

// define the initial state
const initialState: State = {
  designs: [],
  user: null,
  selectedProductType: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDesigns: (designs) => set({ designs }),

    removeDesign: (id) => {
      const designsAfterRemove = get().designs.filter((design) => design.id !== id);
      set({ designs: designsAfterRemove });
    },

    addDesign: (design) => {
      const newDesign: Design = {
        ...design,
      };
      const designsAfterNewDesign = [newDesign, ...get().designs];
      set({ designs: designsAfterNewDesign });
    },
    
    updateDesign: (id: string, newProductType: string, newImage: string) => {
      const designs = get().designs;
      const designIndex = designs.findIndex((design) => design.id === id);

      if (designIndex !== -1) {
        designs[designIndex].productType = newProductType;
        designs[designIndex].image = newImage;
        set({ designs: [...designs] });
      }
    },

    getDesignById: (id: string) => {
      return get().designs.find((design) => design.id === id);
    },

    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setSelectedProductType: (productType: string) => set({ selectedProductType: productType }),

    clearSelectedProductType: () => set({ selectedProductType: null }),
  })),
);
