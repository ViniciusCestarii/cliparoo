<script lang="ts">
	import cliparooSrc from '../../../../../static/cliparoo.png';
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header class="sticky top-0 z-10 border-b border-base-300 bg-base-100/70 backdrop-blur-md">
	<nav class="navbar mx-auto max-w-screen-lg justify-between">
		<div class="flex items-center space-x-1">
			<img src={cliparooSrc} alt="Cliparoo Logo" class="size-10" />
			<span class="text-lg">Cliparoo</span>
		</div>
		<ul class="flex space-x-2">
			<li><a href="#home">Home</a></li>
			<li><a href="#features">Features</a></li>
			<li><a href="#download">Download</a></li>
			<li><a href="#faq">FAQ</a></li>
			<li class="flex items-center justify-center">
				<ThemeToggle />
			</li>
		</ul>
	</nav>
</header>
