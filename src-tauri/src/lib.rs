mod commands;
mod tray;

use commands::*;
use tray::init_tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            init_tray(app)?;
            Ok(())
        })
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![greet, get_window_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
