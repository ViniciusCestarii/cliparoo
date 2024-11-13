<script lang="ts">
	import { cn } from '$lib/utils';
	import * as SimpleIcons from 'simple-icons';
	import type { HTMLAttributes } from 'svelte/elements';

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

	interface ClipboardWindowBadgeProps extends HTMLAttributes<HTMLElement> {
		window: string;
	}

	let { class: className, window }: ClipboardWindowBadgeProps = $props();
</script>

<span class={cn('badge flex w-full max-w-fit justify-start gap-1', className)}>
	<span class="text-ellipsis whitespace-nowrap overflow-hidden">
		{window}
	</span>
	{#if window !== 'Cliparoo'}
		<svg
			class="w-4 h-4 flex-shrink-0"
			fill="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d={getIconForWindow(window).path} />
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			viewBox="0 0 24 24"
			xml:space="preserve"
			fill="currentColor"
			class="h-4 w-4"
		>
			<defs> </defs>
			<g transform="matrix(0.0176 0 0 0.0176 12.0149 12.0149)">
				<g style="" vector-effect="non-scaling-stroke">
					<g transform="matrix(0.1333 0 0 -0.1333 48.9436 39.8414)">
						<path
							style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;"
							transform=" translate(-5488.2135, -4819.9841)"
							d="M 4755 9611 c -104 -50 -195 -145 -355 -370 c -177 -250 -311 -519 -405 -812 c -77 -238 -111 -388 -142 -629 c -22 -169 -25 -606 -5 -750 c 33 -234 85 -462 144 -627 c 27 -74 24 -80 -74 -129 c -152 -77 -509 -328 -753 -530 c -182 -150 -540 -422 -673 -510 c -100 -66 -260 -163 -357 -216 c -66 -36 -219 -119 -340 -185 c -121 -66 -265 -143 -320 -173 c -249 -132 -335 -197 -412 -312 c -272 -410 -68 -1063 417 -1335 c 210 -119 394 -182 735 -253 c 449 -93 1368 -199 2015 -231 c 118 -6 225 -12 236 -15 c 17 -3 23 -13 27 -51 c 20 -152 29 -348 24 -508 c -6 -195 -17 -269 -127 -875 c -32 -179 -65 -377 -74 -440 c -29 -208 -55 -443 -62 -552 l -7 -108 l 162 0 l 161 0 l 0 47 c 0 60 45 456 71 628 c 11 72 42 245 69 385 c 56 290 92 496 116 655 c 19 134 21 433 4 625 c -7 74 -13 146 -14 160 c -1 25 1 25 99 33 c 165 13 183 17 215 43 c 65 55 62 154 -5 213 l -36 31 l -132 0 c -361 0 -946 43 -1847 135 c -80 8 -203 24 -275 35 c -71 11 -168 24 -215 30 c -115 15 -363 58 -430 75 c -30 8 -102 26 -159 40 c -111 28 -275 87 -356 128 c -48 24 -142 91 -196 139 c -63 57 -159 198 -159 234 c 0 2 24 16 53 30 c 112 56 249 191 320 314 c 86 149 63 291 -58 359 c -30 17 -55 35 -55 39 c 1 11 130 88 295 175 c 83 43 186 100 230 126 c 44 26 125 74 180 106 c 305 176 626 388 763 505 c 46 38 137 111 202 161 c 66 50 141 110 167 133 c 26 24 104 83 173 133 c 69 49 155 113 193 141 c 85 65 288 186 479 286 c 318 167 720 294 1078 342 c 105 14 167 15 390 8 c 334 -10 377 -9 406 11 c 40 26 54 68 69 217 c 35 331 117 615 260 896 c 231 457 539 776 1035 1074 c 91 55 310 167 336 173 c 10 2 42 15 71 29 c 28 14 64 28 80 32 c 15 3 0 -8 -34 -25 c -107 -55 -299 -191 -403 -285 c -121 -110 -309 -306 -370 -384 c -306 -394 -487 -787 -559 -1212 c -30 -180 -31 -189 -50 -547 c -13 -225 -23 -348 -32 -368 c -8 -16 -33 -58 -56 -93 c -51 -75 -56 -120 -20 -173 c 49 -73 124 -84 211 -28 c 52 33 89 86 128 185 c 40 103 56 212 68 465 c 25 522 79 764 249 1114 c 128 265 209 382 414 600 c 120 128 318 305 421 375 c 243 167 562 334 887 463 c 165 66 231 86 278 87 l 24 0 l -7 -192 c -12 -330 -49 -597 -122 -893 c -76 -305 -124 -450 -239 -720 c -234 -549 -649 -1069 -1083 -1353 c -125 -82 -300 -175 -392 -207 c -322 -115 -343 -125 -372 -184 c -21 -43 -22 -60 -26 -411 c -11 -870 63 -1698 204 -2292 c 127 -537 302 -942 609 -1411 c 161 -247 437 -559 675 -765 c 250 -216 595 -463 852 -611 l 106 -61 l 344 0 l 343 1 l -230 117 c -464 237 -708 388 -998 620 c -254 203 -376 320 -606 585 c -155 177 -346 462 -474 707 c -223 426 -384 1049 -457 1764 c -57 558 -86 1542 -46 1575 c 6 5 47 23 91 39 c 320 117 691 354 951 608 c 272 267 577 694 724 1014 c 230 501 356 917 421 1390 c 39 290 37 795 -5 893 c -20 48 -83 105 -125 114 c -55 12 -401 8 -526 -6 c -443 -48 -850 -169 -1233 -367 c -445 -229 -780 -501 -1044 -849 c -111 -148 -213 -306 -270 -420 c -27 -55 -53 -104 -58 -109 c -10 -10 -16 9 -50 168 c -60 280 -230 688 -407 975 c -222 359 -578 751 -732 806 c -69 24 -137 19 -206 -14 z m 164 -328 c 43 -33 53 -43 153 -154 c 347 -386 624 -909 748 -1411 c 44 -180 85 -420 94 -554 c 7 -91 -8 -306 -23 -347 c -8 -22 -10 -22 -252 -19 c -248 3 -315 -2 -549 -43 c -216 -38 -524 -134 -720 -224 c -67 -31 -76 -28 -94 27 c -26 81 -64 242 -91 387 c -57 307 -48 769 20 1060 c 97 413 197 661 393 974 c 103 163 240 331 271 331 c 8 0 30 -12 50 -27 z"
							stroke-linecap="round"
						/>
					</g>
					<g transform="matrix(0.1333 0 0 -0.1333 -2.9295 27.5902)">
						<path
							style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;"
							transform=" translate(-5098.1772, -4912.9225)"
							d="M 4920 5502 c -77 -26 -116 -47 -188 -104 c -83 -67 -123 -117 -171 -218 c -97 -204 -70 -446 71 -634 c 189 -252 518 -311 775 -140 c 131 87 219 202 265 347 c 28 89 28 258 -1 348 c -39 122 -131 237 -257 319 c -105 68 -181 91 -324 96 c -93 3 -126 1 -170 -14 z m 71 -204 c 121 -68 131 -231 22 -328 c -143 -126 -313 -58 -313 124 c 0 164 161 277 291 204 z"
							stroke-linecap="round"
						/>
					</g>
				</g>
			</g>
		</svg>
	{/if}
</span>
