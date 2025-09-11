import { type Node, Handle, NodeToolbar, NodeProps, Position } from "@xyflow/react";
import "./NodeStyles.css";
import React from "react";
import useStore from "../../models/store";
import { getDefaultNode, NodeData } from "../../models/node";

export default function LabelNode(props: NodeProps<Node<NodeData>>) {
  const { id, data } = props;
  const isSelected = id === useStore((state) => state.selectedNode)

  const addNode = useStore((state) => state.addNode);
  const updateNodeData = useStore((state) => state.updateNodeData);
  const textRef = React.useRef<HTMLTextAreaElement>(null);

  const onClick = () => addNode({
    ...getDefaultNode(),
    position: {
      x: props.positionAbsoluteX,
      y: props.positionAbsoluteY - 100,
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData(props.id, { label: event.target.value });

    if (textRef.current) {
      textRef.current.style.height = "auto"
      textRef.current.style.height = `${textRef.current.scrollHeight}px`
    }
  };

  return (
    <>
      <NodeToolbar >
        <button className="mx-5">delete</button>
        <button onClick={onClick} className="mx-5">
          add
        </button>
      </NodeToolbar>

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
