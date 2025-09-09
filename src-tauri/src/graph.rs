use std::collections::HashMap;

use petgraph::graph::DiGraph;
use serde::{Deserialize, Serialize};

use crate::node::Node;

#[derive(Serialize, Deserialize)]
#[serde(transparent)]
pub struct Graph {
    data: DiGraph<Node, ()>,
}

impl Graph {
    pub fn new() -> Graph {
        Graph {
            data: DiGraph::new(),
        }
    }

    pub fn create_node(&mut self, name: &str) {
        self.data.add_node(Node::new(name));
    }

    pub fn create_edge(&mut self, from: u32, to: u32) -> Result<(), String> {
        self.data.add_edge(from.into(), to.into(), ());
        Ok(())
    }

    pub fn delete_node(&mut self, index: u32) -> Result<Node, String> {
        self.data
            .remove_node(index.into())
            .ok_or(format!("No node at index {}", index))
    }

    pub fn update_node(&mut self, index: u32, new_data: HashMap<String, String>) {
        if let Some(node) = self.data.node_weight_mut(index.into()) {
            for (key, value) in new_data {
                match key.as_str() {
                    "name" => node.name = value,
                    "text" => node.text = value,
                    _ => node.set_attribute(&key, &value),
                }
            }
        }
    }
}
