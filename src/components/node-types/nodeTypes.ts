import { Tag, Image, TextAlignJustify, FileCode2 } from "lucide-react";

import LabelNode from "./LabelNode";

export const nodeTypes = {
  label: LabelNode,
  image: LabelNode,
  text: LabelNode,
  class: LabelNode,
}

export const nodeProperties = {
  label: {
    name: "Label Node",
    description: "A base node, contaning a text label and textual content",
    icon: Tag,
    nodeColor: "text-sky-600",
    bgColor: "bg-sky-200",
  },
  image: {
    name: "Image Node",
    description: "A node for displaying images directly in your editor",
    icon: Image,
    nodeColor: "text-green-600",
    bgColor: "bg-green-200",
  },
  text: {
    name: "Raw Text",
    description: "Raw text for describing any part of your graph",
    icon: TextAlignJustify,
    nodeColor: "text-rose-600",
    bgColor: "bg-rose-200",
  },
  class: {
    name: "UML Class",
    description: "A class node for UML Class Diagramas",
    icon: FileCode2,
    nodeColor: "text-indigo-600",
    bgColor: "bg-indigo-200",
  }
}
