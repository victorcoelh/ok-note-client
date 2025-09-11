import { FolderOpen, Save, Undo, Redo, Settings } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div>
        <FolderOpen />
        <p>Open</p>
      </div>

      <div>
        <Save />
        <p>Save</p>
      </div>

      <div>
        <Undo />
      </div>

      <div>
        <Redo />
      </div>

      <div id="settings">
        <Settings />
      </div>
    </header>
  );
}
