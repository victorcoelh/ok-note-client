import type { Node } from "@xyflow/react";

export type NodeData = {
  label: string;
  text: string;
};

export function getDefaultNode(): Node<NodeData> {
  return {
    id: "0",
    type: "label",
    position: { x: 0, y: 0 },
    data: {
      label: "New node",
      text: "",
    },
  }
}
