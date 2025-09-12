import useStore from "@/models/store";
import { Sparkles, Send } from "lucide-react";

export default function RightPanel() {
  const rightPanelMode = useStore((state) => state.rightPanelMode);

  return (
    <aside className="right">
      <SelectionButtons />
      {rightPanelMode === "details" ? <DetailsPanel /> : <ChatBotPanel />}
    </aside>
  );
}

function SelectionButtons() {
  const rightPanelMode = useStore((state) => state.rightPanelMode);
  const setRightPanelMode = useStore((state) => state.setRightPanelMode);

  const isDetailsMode = rightPanelMode === "details";

  return (
    <div className="flex justify-center items-center bg-secondary p-1 rounded-xl m-4">
      <button
        className={isDetailsMode ? "section-button selected" : "section-button"}
        onClick={() => setRightPanelMode("details")}
      >
        Node Details
      </button>

      <button
        className={isDetailsMode ? "section-button" : "section-button selected"}
        onClick={() => setRightPanelMode("chat")}
      >
        AI Chat
      </button>
    </div>
  );
}

function DetailsPanel() {
  const selectedNode = useStore((state) => state.selectedNode);
  const nodes = useStore((state) => state.nodes);
  const updateNodeData = useStore((state) => state.updateNodeData);

  const selectedNodeData = nodes.find((node) => node.id === selectedNode)?.data;

  return (
    <div className="mx-4">
      <div className="flex justify-between mt-6">
        <h2 className="font-bold">{selectedNodeData?.label}</h2>
        <div className="border rounded-lg text-xs font-bold border-sidebar-border py-0.5 px-2 items-center flex">
          Text Node
        </div>
      </div>

      <h3 className="mt-2 font-bold text-sm my-1">Content</h3>
      <textarea
        className="bg-input-background rounded-lg w-full resize-none p-2 outline-none mb-5 text-sm"
        placeholder="Enter description..."
        value={selectedNodeData?.text}
        onChange={(e) => {updateNodeData(selectedNode!, { text: e.target.value })}}
        rows={20}
      />

      <div className="bg-background p-5 rounded-lg border-sidebar-border border-1">
        <h3 className="mb-5">Node Settings</h3>
        <h3>Color</h3>
        <div className="bg-blue-200 w-8 h-8 rounded-lg border-1 border-ring/40"></div>
      </div>
    </div>
  );
}

function ChatBotPanel() {
  return (
    <>
      <div className="flex items-center gap-2 mx-4 mt-6">
        <Sparkles size={16} />
        <h2 className="font-bold">AI Assistant</h2>
      </div>

      <p className="subtext mx-4 mt-1">Get help with your graph</p>

      <div className="my-5 border-y-1 border-ring/50 py-5 px-4">
        <ChatMessage />
      </div>

      <div className="mx-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask questions about your graph!"
          className="bg-input-background rounded-lg w-full resize-none py-1.5 px-3 text-sm"
        />
        <div className="bg-foreground py-2 px-2.5 rounded-lg">
          <Send size={16} className="text-white" />
        </div>
      </div>
    </>
  );
}

function ChatMessage() {
  return (
    <div className="bg-secondary rounded-lg p-3 mr-15">
      <p className="text-message">
        Hello! I'm here to help you create and modify nodes in your graph. What would you
        like to do?
      </p>
    </div>
  );
}
