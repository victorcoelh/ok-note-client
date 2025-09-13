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
  leftPanelCollapsed: boolean;
  rightPanelCollapsed: boolean;

  setNodes: (changes: Array<NodeChange<Node<NodeData>>>) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  addNode: (newNode: Node<NodeData>) => void;
  deleteNode: (id: string) => void;

  setEdges: (changes: Array<EdgeChange<Edge>>) => void;
  addEdge: (params: Edge | Connection) => void;

  setSelectedNode: (id: string | null) => void;
  setRightPanelMode: (mode: "details" | "chat") => void;

  setLeftPanelCollapsed: (collapsed: boolean) => void;
  setRightPanelCollapsed: (collapsed: boolean) => void;
}

const useStore = create<EditorState>()((set) => ({
  nodes: [getDefaultNode()],
  edges: [],
  selectedNode: null,
  rightPanelMode: "details",
  leftPanelCollapsed: false,
  rightPanelCollapsed: false,

  setNodes: (changes) =>
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),

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

  deleteNode: (id) =>
    set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id) })),

  setEdges: (changes) =>
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

  addEdge: (params) => set((state) => ({ edges: addEdge(params, state.edges) })),

  setSelectedNode: (id) => set((_state) => ({ selectedNode: id })),

  setRightPanelMode: (mode) => set((_state) => ({ rightPanelMode: mode })),

  setLeftPanelCollapsed: (collapsed) =>
    set((_state) => ({ leftPanelCollapsed: collapsed })),

  setRightPanelCollapsed: (collapsed) =>
    set((_state) => ({ rightPanelCollapsed: collapsed })),
}));

export default useStore;
