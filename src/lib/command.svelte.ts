import { invoke } from "@tauri-apps/api/core";

export const invokeGetWindowName = async () => {
	return await invoke<string>("get_window_name");
}

export const invokeGetWindow = async () => {
	return await invoke<string>('get_window_name')
}