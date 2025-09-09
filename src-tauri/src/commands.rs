use tauri::State;

use crate::{node::Node, state::AppState};

#[tauri::command]
pub async fn create_node(state: State<'_, AppState>, name: &str) -> Result<(), String> {
    state
        .graph
        .lock()
        .as_mut()
        .map_err(|err| err.to_string())
        .and_then(|graph| Ok(graph.create_node(name)))
}

#[tauri::command]
pub async fn pop_node(state: State<'_, AppState>, index: u32) -> Result<Node, String> {
    state
        .graph
        .lock()
        .as_mut()
        .map_err(|err| err.to_string())
        .and_then(|graph| graph.delete_node(index))
}

#[tauri::command]
pub async fn create_edge(state: State<'_, AppState>, from: u32, to: u32) -> Result<(), String> {
    state
        .graph
        .lock()
        .as_mut()
        .map_err(|err| err.to_string())
        .and_then(|graph| graph.create_edge(from, to))
}

#[tauri::command]
pub async fn read_graph(state: State<'_, AppState>) -> Result<serde_json::Value, String> {
    let graph_guard = state.graph.lock().map_err(|err| err.to_string())?;

    serde_json::to_value(&*graph_guard)
        .map_err(|err| format!("Serialization error: {}", err))
}
