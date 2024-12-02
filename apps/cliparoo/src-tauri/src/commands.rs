#[tauri::command]
pub fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

use active_win_pos_rs::get_active_window;

#[tauri::command]
pub fn get_window_name() -> String {
    match get_active_window() {
        Ok(active_window) => {
            active_window.title
        }
        Err(()) => {
            "Error".to_string()
        }
    }
}
