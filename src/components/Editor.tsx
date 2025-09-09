import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import useStore from "../models/store";
import nodeTypes from "../components/node-types/nodeTypes";

export default function Editor() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const addEdge = useStore((state) => state.addEdge);
  const setSelectedNode = useStore((state) => state.setSelectedNode);

  return (
    <main>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={addEdge}
        onNodeClick={(_event, node) => setSelectedNode(node.id)}
        onPaneClick={() => setSelectedNode(null)}
        nodesConnectable
        nodesDraggable
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}
