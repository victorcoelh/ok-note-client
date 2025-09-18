import { create } from "zustand";
import { FlowSlice, createFlowSlice } from "./flowSlice";
import { UiSlice, createUiSlice } from "./uiSlice";

export type AppState = FlowSlice & UiSlice;

const useStore = create<AppState>()((...a) => ({
  ...createFlowSlice(...a),
  ...createUiSlice(...a),
}));

export default useStore;
