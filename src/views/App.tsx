import Editor from "@components/Editor.tsx";
import Header from "@components/Header.tsx";
import LeftBar from "@components/LeftPanel.tsx";
import RightBar from "@components/RightPanel.tsx";
import "./App.css";
import useStore from "@/models/store";

export default function App() {
  const leftPanelCollapsed = useStore((state) => state.leftPanelCollapsed);
  const rightPanelCollapsed = useStore((state) => state.rightPanelCollapsed);

  let div_class = "root-div";

  if (leftPanelCollapsed && rightPanelCollapsed) div_class += " both-collapsed";
  else if (leftPanelCollapsed) div_class += " left-collapsed";
  else if (rightPanelCollapsed) div_class += " right-collapsed";

  return <div className={div_class}>
    <Header />
    <LeftBar />
    <Editor />
    <RightBar />
  </div>;
}

/*
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  } */
