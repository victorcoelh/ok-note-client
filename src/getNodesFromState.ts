import { EditorState } from "./models/store";

export default function getDataFromState(state: EditorState): string {
  const nodes = state.nodes
  const edges = state.edges

  const nodesData = nodes.map((node) => {
    return {
      id: node.id,
      ...node.data
    }
  })

  const edgeData = edges.map((edge) => {
    return {
    source: edge.source,
    target: edge.target,
    }
  })

  return JSON.stringify({
    nodes: nodesData,
    edges: edgeData,
  })
}
