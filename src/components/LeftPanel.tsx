import { ChevronLeft } from "lucide-react";
import { nodeTypes, nodeProperties } from "./node-types/nodeTypes";
import React from "react";
import useStore from "@/models/store";

export default function LeftPanel() {
  const leftPanelCollapsed = useStore((state) => state.leftPanelCollapsed);
  const setLeftPanelCollapsed = useStore((state) => state.setLeftPanelCollapsed);

  const collapsePanel = () => setLeftPanelCollapsed(!leftPanelCollapsed)

  return (
    <aside className="left">
      <div className="flex items-center p-3 bg-background w-full border-b-1 border-sidebar-border">
        <p hidden={leftPanelCollapsed}>Toolbox</p>
        <ChevronLeft
          size={16}
          className={`ml-auto mr-2 transition-transform duration-300 ${
            leftPanelCollapsed ? "rotate-180" : ""
          }`}
          onClick={collapsePanel}
        />
      </div>

      <NodeList />
    </aside>
  );
}

function NodeList() {
  const nodeTypeKeys = Object.keys(nodeTypes) as Array<keyof typeof nodeTypes>;
  const leftPanelCollapsed = useStore((state) => state.leftPanelCollapsed);

  return (
    <ul
      className="p-3 overflow-y-auto"
      hidden={leftPanelCollapsed}
    >
      {nodeTypeKeys.map((key) => <NodeType key={key} nodeKey={key} />)}
    </ul>
  );
}

function NodeType({ nodeKey }: { nodeKey: keyof typeof nodeTypes }) {
  const { name, description, icon, nodeColor, bgColor } = nodeProperties[nodeKey];

  const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    event.dataTransfer.setData("application/reactflow", nodeKey);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <li
      draggable
      className="bg-card rounded-lg p-3 flex items-center gap-3 my-2"
      onDragStart={onDragStart}
    >
      <div className={`${bgColor} ${nodeColor} p-2 rounded-lg`}>
        {React.createElement(icon)}
      </div>

      <div>
        <p className="mb-1">{name}</p>
        <div className="text-sm bg-secondary text-secondary-foreground rounded-lg py-1.5 px-2">
          <p className="node-text">{description}</p>
        </div>
      </div>
    </li>
  );
}
