<script lang="ts">
	import * as SimpleIcons from 'simple-icons';

	type SimpleIcon = SimpleIcons.SimpleIcon;

	function getIconForWindow(name: string): SimpleIcon {
		const names = name.split(/[ .]/);

		const tryToGetIcon = (name: string): SimpleIcon | null => {
			const cleanName = name
				.replace(/[^a-zA-Z]/g, '')
				.trim()
				.toLowerCase();
			const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
			const iconKey = `si${formattedName}`;
			let simpleIcon = SimpleIcons[iconKey as keyof typeof SimpleIcons];

			// Default icon if no match found
			if (!simpleIcon) {
				return null;
			}

			return simpleIcon as SimpleIcon;
		};

		for (const n of names) {
			const icon = tryToGetIcon(n);
			if (icon) {
				return icon;
			}
		}

		return SimpleIcons['siGhostery'];
	}

	let { window }: { window: string } = $props();

	let icon = $state(getIconForWindow(window));
</script>

<span class="badge flex w-full max-w-fit justify-start gap-1">
	<span class="text-ellipsis whitespace-nowrap overflow-hidden">
		{window}
	</span>
	<svg
		class="w-4 h-4 flex-shrink-0"
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path d={icon.path} />
	</svg>
</span>
