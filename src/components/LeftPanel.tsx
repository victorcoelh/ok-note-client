import { ChevronLeft } from "lucide-react";
import { nodeTypes, nodeProperties } from "./node-types/nodeTypes";
import React from "react";

export default function LeftPanel() {
  return (
    <aside className="left">
      <div className="flex items-center p-3 bg-background w-full border-b-1 border-sidebar-border">
        <p>Toolbox</p>
        <ChevronLeft size={16} className="ml-auto mr-2" />
      </div>

      <NodeList />
    </aside>
  );
}

function NodeList() {
  const nodeTypesKeys = Object.keys(nodeTypes) as Array<keyof typeof nodeTypes>;

  return (
    <ul className="p-3 overflow-y-auto">
      {nodeTypesKeys.map((key) => <NodeType nodeKey={key} />)}
    </ul>
  );
}

function NodeType({ nodeKey }: { nodeKey: keyof typeof nodeTypes }) {
  const nodeElement = nodeTypes[nodeKey];
  const { name, description, icon, nodeColor, bgColor } = nodeProperties[nodeKey];

  console.log(`bg-${bgColor} text-${nodeColor} p-2 rounded-lg`)

  return (
    <li className="bg-card rounded-lg p-3 flex items-center gap-3 my-2">
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
