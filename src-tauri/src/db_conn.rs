use mysql::*;
use mysql::prelude::*;
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::io::Read;
use base64::encode;
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
pub struct SideBar {
    id: i32,
    author: String,
    numppu: i32,
    problem: String,
    proposal: String,
    photo: Option<String>,
    department: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MainTable {
    numppu: i32,
    date: String,
    author: String,
    object: String,
    typeppu: String, 
}

pub fn get_sidebar(id: i32) -> Result<SideBar, Box<dyn std::error::Error>> {
    let url = "mysql://user:12345@localhost:3306/later-transfer-to-oracle";
    let pool = Pool::new(url)?;
    let mut conn = pool.get_conn()?;

    let result: Option<mysql::Row> = conn.exec_first(
        "SELECT id, author, numPpu, problem, proposal, photo, department FROM sidebar WHERE id = :id",
        params! {
            "id" => id,
        },
    )?;

    match result {
        Some(row) => {
            let photo_path: Option<String> = row.get("photo");
            let photo_base64 = if let Some(path) = photo_path {
                if Path::new(&path).exists() {
                    let mut file = File::open(path)?;
                    let mut buffer = Vec::new();
                    file.read_to_end(&mut buffer)?;
                    Some(encode(&buffer))
                } else {
                    None
                }
            } else {
                None
            };

            let realization = SideBar {
                id: row.get("id").unwrap(),
                author: row.get("author").unwrap(),
                numppu: row.get("numPpu").unwrap(),
                problem: row.get("problem").unwrap(),
                proposal: row.get("proposal").unwrap(),
                photo: photo_base64,
                department: row.get("department").unwrap(),
            };
            Ok(realization)
        },
        None => Err("No data found".into()),
    }
}


pub fn get_table() -> Result<Vec<MainTable>, Box<dyn std::error::Error>> {
    let url = "mysql://user:12345@localhost:3306/later-transfer-to-oracle";
    let pool = Pool::new(url)?;
    let mut conn = pool.get_conn()?;
    let results: Vec<mysql::Row> = conn.exec("SELECT numppu, date, author, object, type FROM sidebar", ())?;

    let main_tables: Vec<MainTable> = results
        .into_iter()
        .map(|row| MainTable {
            numppu: row.get("numppu").unwrap(),
            date: row.get("date").unwrap(),
            author: row.get("author").unwrap(),
            object: row.get("object").unwrap(),
            typeppu: row.get("type").unwrap(),
        })
        .collect();

    Ok(main_tables)
}