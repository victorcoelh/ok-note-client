use std::{collections::HashMap, sync::Mutex};

use crate::graph::Graph;

pub struct AppState {
    pub graph: Mutex<Graph>,
    pub _configs: Mutex<HashMap<String, String>>,
}

impl AppState {
    pub fn new() -> AppState {
        AppState {
            graph: Mutex::new(Graph::new()),
            _configs: Mutex::new(HashMap::new())
        }
    }
}
