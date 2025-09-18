import { FolderOpen, Save, Undo, Redo, Settings } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import { save, open } from "@tauri-apps/plugin-dialog";

import useStore from "@/models/store";

export default function Header() {
  const onSave = async () => {
    const path = await save({
      filters: [
        {
          name: "JSON",
          extensions: ["json"]
        }
      ]
    });

    console.log(path);
    const storeData = JSON.stringify(useStore.getState());
    await invoke("save_graph", { data: storeData, path: path });
  }

  const onOpen = async () => {
    const filePath = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "JSON",
          extensions: ["json"]
        }
      ]
    })

    console.log(filePath);
    const fileContents = await invoke("load_graph", { path: filePath });
    const loadedState = JSON.parse(fileContents as string);

    console.log(loadedState);
    useStore.setState(loadedState);
  }

  return (
    <header>
      <div onClick={onOpen}>
        <FolderOpen size={16}/>
        <p>Open</p>
      </div>

      <div onClick={onSave}>
        <Save size={16}/>
        <p>Save</p>
      </div>

      <div>
        <Undo size={16}/>
      </div>

      <div>
        <Redo size={16}/>
      </div>

      <div id="settings">
        <Settings size={16}/>
      </div>
    </header>
  );
}


/*
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  } */

