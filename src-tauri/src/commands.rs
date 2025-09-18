use std::fs::File;
use std::io::{Read, Write};
use std::path::PathBuf;

#[tauri::command]
#[specta::specta]
pub async fn save_graph(data: &str, path: &str) -> Result<(), String> {
    let mut file_path = PathBuf::from(path);
    file_path.set_extension(".json");

    let mut file = File::create(file_path).map_err(|e| e.to_string())?;
    file.write_all(data.as_bytes()).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub async fn load_graph(path: &str) -> Result<String, String> {
    let mut file = File::open(path).map_err(|e| e.to_string())?;
    let mut contents = String::new();

    file.read_to_string(&mut contents)
        .map_err(|e| e.to_string())?;

    Ok(contents)
}

#[tauri::command]
#[specta::specta]
pub async fn answer_question(question: &str, data: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    let res = client
        .post("http://localhost:8080/llm/summarize")
        .body(data.to_string())
        .send()
        .await
        .map_err(|e| e.to_string())?;

    Ok(res.text().await.map_err(|e| e.to_string())?)
}

#[tauri::command]

pub async fn suggest_node(data: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    let res = client
        .post("http://localhost:8080/summarize")
        .body(data.to_string())
        .send()
        .await
        .map_err(|e| e.to_string())?;

    Ok(res.text().await.map_err(|e| e.to_string())?)
}
