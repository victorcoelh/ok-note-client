import { StateCreator } from "zustand";
import { type Node, type Edge } from "@xyflow/react";

import { NodeData } from "./node";
import { ImmutableArray } from "./immutable";

type FlowState = {
  nodes: ImmutableArray<Node<NodeData>>;
  edges: ImmutableArray<Edge>;
  selectedNode: string | null;
};

type FlowActions = {
  setNodes: (updater: (nodes: ImmutableArray<Node<NodeData>>) => void) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  setEdges: (updater: (edges: ImmutableArray<Edge>) => void) => void;
  setSelectedNode: (id: string | null) => void;
};

export type FlowSlice = FlowState & FlowActions;

export const createFlowSlice: StateCreator<FlowSlice> = (set, get) => ({
  nodes: new ImmutableArray(),
  edges: new ImmutableArray(),
  selectedNode: null,

  setNodes: (updater) => updater(get().nodes),

  updateNodeData: (id, data) => {
    get().nodes.update((draft) => {
      const node = draft.find((node) => node.id === id);
      if (!node) return;

      Object.assign(node.data, data);
    });
  },

  setEdges: (updater) => updater(get().edges),

  setSelectedNode: (id) => set({ selectedNode: id }),
});
