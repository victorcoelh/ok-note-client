import { type Node, Handle, NodeToolbar, NodeProps, Position, XYPosition } from "@xyflow/react";
import "./NodeStyles.css";
import React from "react";
import useStore from "../../models/store";
import { getDefaultNode, NodeData } from "../../models/node";
import { Minus, Plus } from "lucide-react";

export default function LabelNode(props: NodeProps<Node<NodeData>>) {
  const { id, data } = props;
  const selectedNode = useStore((s) => s.selectedNode);
  const isSelected = id === selectedNode;

  const updateNodeData = useStore((state) => state.updateNodeData);
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(props.id, { label: event.target.value });

    if (textRef.current) {
      textRef.current.style.height = "auto";
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  };

  const position = {
    x: props.positionAbsoluteX,
    y: props.positionAbsoluteY-80,
  };

  return (
    <>
      <Toolbar id={id} position={position} />

      <div className="node">
        <div>
          <textarea
            ref={textRef}
            rows={1}
            placeholder="New node"
            value={data.label}
            onInput={onChange}
            className="flex"
          />
        </div>
      </div>

      <Handle id="a" type="target" position={Position.Top} />
      <Handle id="b" type="source" position={Position.Bottom} />
    </>
  );
}

function Toolbar({ id, position }: { id: string; position: XYPosition }) {
  const addNode = useStore((state) => state.addNode);
  const deleteNode = useStore((state) => state.deleteNode);

  const onPlus = () => addNode({
    ...getDefaultNode(),
    position: position,
  });

  return (
    <NodeToolbar className="gap-5">
      <button className="toolbar-button" onClick={() => deleteNode(id)}>
        <Minus size={18} />
      </button>
      <button  className="toolbar-button" onClick={onPlus}>
        <Plus size={18} />
      </button>
    </NodeToolbar>
  )
}
