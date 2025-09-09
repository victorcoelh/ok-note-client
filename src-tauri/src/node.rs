use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Node {
    pub name: String,
    pub text: String,
    attributes: HashMap<String, String>
}

impl Node {
    pub fn new(name: &str) -> Node {
        Node {
            name: name.to_string(),
            text: String::new(),
            attributes: HashMap::new()
        }
    }

    pub fn get_attribute(&self, attribute: &str) -> Option<String> {
        self.attributes.get(attribute).cloned()
    }

    pub fn set_attribute(&mut self, attribute: &str, value: &str) {
        self.attributes.insert(attribute.to_string(), value.to_string());
    }
}
