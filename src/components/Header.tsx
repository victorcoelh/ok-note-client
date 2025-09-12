import { FolderOpen, Save, Undo, Redo, Settings } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div>
        <FolderOpen size={16}/>
        <p>Open</p>
      </div>

      <div>
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
