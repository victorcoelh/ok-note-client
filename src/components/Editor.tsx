import {
  type Node,
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  NodeChange,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  addEdge,
  Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import useStore from "../models/store";
import { nodeTypes } from "../components/node-types/nodeTypes";
import { getDefaultNode, NodeData } from "@/models/node";
import { useCallback } from "react";

export default function Editor() {
  return (
    <main>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </main>
  );
}

function Flow() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const setSelectedNode = useStore((state) => state.setSelectedNode);

  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const data = event.dataTransfer.getData("application/reactflow");
    if (!data) return;

    const nodeType = data as keyof typeof nodeTypes;
    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const newNode: Node<NodeData> = {
      ...getDefaultNode(),
      type: nodeType,
      position: position,
    };

    setNodes((nodes) => nodes.push(newNode));
  }, []);

  const onNodesChange = useCallback((changes: Array<NodeChange<Node<NodeData>>>) => {
    const newNodes = applyNodeChanges(changes, nodes.value);
    setNodes((nodes) => nodes.replace(newNodes));
  }, []);

  const onEdgesChange = useCallback((changes: Array<EdgeChange<Edge>>) => {
    const newEdges = applyEdgeChanges(changes, edges.value);
    setEdges((edges) => edges.replace(newEdges));
  }, []);

  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((immutable) => immutable.update((edges) => addEdge(params, edges)));
  }, []);

  return (
    <ReactFlow
      nodes={nodes.value}
      edges={edges.value}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={(_event, node) => setSelectedNode(node.id)}
      onPaneClick={() => setSelectedNode(null)}
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      nodesConnectable
      nodesDraggable
      fitView
    >
      <Background bgColor={"#FFFFFF"} />
      <Controls />
    </ReactFlow>
  );
}
