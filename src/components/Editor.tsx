import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  type Node,
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
  const addNode = useStore((state) => state.addNode);
  const addEdge = useStore((state) => state.addEdge);
  const setSelectedNode = useStore((state) => state.setSelectedNode);

  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const nodeType = data as keyof typeof nodeTypes;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node<NodeData> = {
        ...getDefaultNode(),
        type: nodeType,
        position: position,
      }
      addNode(newNode);
    },
    [screenToFlowPosition]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={setNodes}
      onEdgesChange={setEdges}
      onConnect={addEdge}
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
