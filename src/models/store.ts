import { create } from "zustand";
import {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

import { NodeData, getDefaultNode } from "./node";

interface EditorState {
  nodes: Array<Node<NodeData>>;
  edges: Array<Edge>;
  selectedNode: string | null;
  rightPanelMode: "details" | "chat";

  setNodes: (changes: Array<NodeChange<Node<NodeData>>>) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  addNode: (newNode: Node<NodeData>) => void;

  setEdges: (changes: Array<EdgeChange<Edge>>) => void;
  addEdge: (params: Edge | Connection) => void;

  setSelectedNode: (id: string | null) => void;
  setRightPanelMode: (mode: "details" | "chat") => void;
}

const useStore = create<EditorState>()((set) => ({
  nodes: [getDefaultNode()],
  edges: [],
  selectedNode: null,
  rightPanelMode: "details",

  setNodes: (changes) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        return node.id === id ? { ...node, data: { ...node.data, ...data } } : node;
      }),
    })),

  addNode: (newNode) =>
    set((state) => {
      newNode.id = state.nodes.length.toString();
      return { nodes: [...state.nodes, newNode] };
    }),

  setEdges: (changes) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

  addEdge: (params) => set((state) => ({ edges: addEdge(params, state.edges) })),

  setSelectedNode: (id) => set((_state) => ({ selectedNode: id })),

  setRightPanelMode: (mode) => set((_state) => ({ rightPanelMode: mode })),
}));

export default useStore;
