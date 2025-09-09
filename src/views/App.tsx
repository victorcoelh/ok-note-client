import Editor from "@components/Editor.tsx";
import Header from "@components/Header.tsx";
import LeftBar from "@components/LeftPanel.tsx";
import RightBar from "@components/RightPanel.tsx";
import "./App.css";

export default function App() {
  return <>
    <Header />
    <LeftBar />
    <Editor />
    <RightBar />
  </>;
}

/*
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  } */
