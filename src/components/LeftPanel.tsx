import { ArrowLeft, Square } from "lucide-react";

export default function LeftPanel() {
  return (
    <aside className="left overflow-hidden">
      <div className="flex items-center bg-sidebar py-2 px-2 sticky">
        <p>Toolbox</p>
        <ArrowLeft size={16} className="ml-auto" />
      </div>

      <NodeList />
    </aside>
  );
}

function NodeList() {
  const nodeTypes = [1, 2, 3, 4, 5];

  return (
    <ul className="p-3 overflow-y-auto">
      {nodeTypes.map(() => {
        return <NodeType />;
      })}
    </ul>
  );
}

function NodeType() {
  return (
    <li className="bg-sidebar-accent rounded-lg p-3 flex items-center gap-3 my-2">
      <div className="bg-blue-300 text-blue-800 p-2 rounded-lg">
        <Square size={18} />
      </div>

      <div>
        <p className="mb-1">Input Node</p>
        <div className="text-sm bg-ring rounded-lg py-1.5 px-2">
          <p className="node-text">Drag to Canvas</p>
        </div>
      </div>
    </li>
  );
}
