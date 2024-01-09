import { log } from "./logger";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
    // Add state variables
};

type Action = {
    // Add actions
};

// define the initial state
const initialState: State = {

};

export const useStore = create<State & Action>()(
    immer((set, get) => ({
        ...initialState,
    }))
  );