import getDataFromState from "@/getNodesFromState";
import ChatMessage from "@/models/chatMessage";
import useStore from "@/models/store";
import { invoke } from "@tauri-apps/api/core";
import { Sparkles, Send, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function RightPanel() {
  const rightPanelMode = useStore((state) => state.rightPanelMode);
  const rightPanelCollapsed = useStore((state) => state.rightPanelCollapsed);
  const setRightPanelCollapsed = useStore((state) => state.setRightPanelCollapsed);

  const collapsePanel = () => setRightPanelCollapsed(!rightPanelCollapsed);

  return (
    <aside className="right">
      <div className="flex items-center p-3 bg-background w-full border-b-1 border-sidebar-border">
        <p hidden={rightPanelCollapsed}>Properties</p>
        <ChevronRight
          size={16}
          className={`ml-auto mr-2 transition-transform duration-300 ${
            rightPanelCollapsed ? "rotate-180" : ""
          }`}
          onClick={collapsePanel}
        />
      </div>
      <div hidden={rightPanelCollapsed}>
        <SelectionButtons />
        {rightPanelMode === "details" ? <DetailsPanel /> : <ChatBotPanel />}
      </div>
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
  const selectedNodeData = nodes.value.find((node) => node.id === selectedNode)?.data;

  if (selectedNode === null) return <DetailsNoNode />;

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
        onChange={(e) => {
          updateNodeData(selectedNode!, { text: e.target.value });
        }}
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

function DetailsNoNode() {
  return (
    <div className="text-center">
      <h2 className="font-normal text-muted-foreground">No node selected</h2>
      <h6 className="text-muted-foreground mt-4 text-sm">
        Click on a node in the canvas to view and edit its properties
      </h6>
    </div>
  );
}

function ChatBotPanel() {
  const chatMessages = useStore((state) => state.chatMessages);
  const pushMessage = useStore((state) => state.pushMessage);

  const [inputText, setInputText] = useState("");

  const onButtonClick = async () => {
    pushMessage({
      sender: "user",
      content: inputText,
    });
    setInputText("");

    const bot_answer = await invoke("answer_question", {
      question: inputText,
      data: getDataFromState(useStore.getState()),
    }).catch((error) => console.log(error));

    console.log(getDataFromState(useStore.getState()))

    pushMessage({
      sender: "bot",
      content: bot_answer as string,
    });
  };

  return (
    <>
      <div className="flex items-center gap-2 mx-4 mt-6">
        <Sparkles size={16} />
        <h2 className="font-bold">AI Assistant</h2>
      </div>

      <p className="subtext mx-4 mt-1">Get help with your graph</p>

      <ul className="my-5 border-y-1 border-ring/50 py-3 px-4">
        {chatMessages.map((message) => (
          <ChatBubble message={message} />
        ))}
      </ul>

      <div className="mx-4 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          placeholder="Ask questions about your graph!"
          className="bg-input-background rounded-lg w-full resize-none py-1.5 px-3 text-sm"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onButtonClick() : null)}
        />
        <button className="bg-foreground py-2 px-2.5 rounded-lg" onClick={onButtonClick}>
          <Send size={16} className="text-white" />
        </button>
      </div>
    </>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isBotMessage = message.sender === "bot";

  const bubbleClass = isBotMessage
    ? "bg-secondary rounded-lg p-3 mr-15 my-2"
    : "bg-ring/50 rounded-lg p-3 ml-15 my-2";

  return (
    <li className={bubbleClass}>
      <p className="text-message">{message.content}</p>
    </li>
  );
}
