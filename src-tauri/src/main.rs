#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db_conn;

use db_conn::SideBar;
use db_conn::MainTable;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sidebar(id: i32) -> Result<SideBar, String> {
    match db_conn::get_sidebar(id) {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Failed to fetch data: {}", e)),
    }
}

#[tauri::command]
fn get_table() -> Result<Vec<MainTable>, String> {
    match db_conn::get_table() {
        Ok(data) => Ok(data),
        Err(e) => Err(format!("Failed to fetch data: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_sidebar,get_table])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
