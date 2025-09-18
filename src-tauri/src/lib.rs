// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            commands::save_graph,
            commands::load_graph,
            commands::answer_question,
            commands::suggest_node,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
