<script>
	import { invoke } from "@tauri-apps/api/core";

  let currentWindowName = $state("");
  
  $effect(() => {
    const id = setInterval(async () => {
      currentWindowName = await invoke("get_window_name");
    }, 200);
  
    return () => {
      clearInterval(id);
    };
  });
  </script>
  
  <main>
    <h1>Window name: {currentWindowName}</h1>
  </main>
  