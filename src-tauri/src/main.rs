// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mysql::{Pool, PooledConn};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
struct FastRealization {
    id: i32,
    author: String,
    num_ppu: i32,
    problem: String,
    proposal: String,
    photo: String,
}

#[tauri::command]
async fn get_fast_realization(id: i32) -> Result<Option<FastRealization>, String> {
    let pool = Pool::new("mysql://user:12345@localhost/later-transfer-to-orade")
        .expect("Failed to connect to database");

    let conn = pool.get_conn().expect("Failed to get connection");

    let mut stmt = conn
        .prep_exec("SELECT * FROM fast_realization WHERE id = ?", (id,))
        .expect("Failed to prepare statement");

    let mut rows = stmt.fetchall().expect("Failed to fetch rows");

    let fast_realization = if let Some(row) = rows.next() {
        Some(FastRealization {
            id: row.get(0).unwrap(),
            author: row.get(1).unwrap(),
            num_ppu: row.get(2).unwrap(),
            problem: row.get(3).unwrap(),
            proposal: row.get(4).unwrap(),
            photo: row.get(5).unwrap(),
        })
    } else {
        None
    };

    Ok(fast_realization)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_fast_realization])
        .run(tauri::generate_context!())
        .expect("Failed to run app");
}
/*// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod db_conn;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
*/