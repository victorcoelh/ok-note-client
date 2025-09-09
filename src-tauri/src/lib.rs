// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{Builder, Manager};

mod commands;
mod state;
pub mod graph;
pub mod node;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    Builder::default()
        .setup(|app| {
            app.manage(state::AppState::new());
            Ok(())
        })
        //.plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::create_node,
            commands::pop_node,
            commands::create_edge,
            commands::read_graph,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
