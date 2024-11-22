// ===============================
// Theme Management
// ===============================
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
	document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
	setTheme(savedTheme === 'dark');
} else {
	setTheme(prefersDark.matches);
}

// Theme event listeners
themeToggle.addEventListener('click', () => {
	const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
	setTheme(!isDark);
});

prefersDark.addEventListener('change', (e) => {
	if (!localStorage.getItem('theme')) {
		setTheme(e.matches);
	}
});

// ===============================
// Theme Toggle Behavior for Elements with `data-set-theme`
// ===============================

const allCliparooThemeButtons = document.querySelectorAll('[data-set-theme]');

allCliparooThemeButtons.forEach((element) => {
	element.addEventListener('click', () => {
		const theme = element.getAttribute('data-set-theme');
		element.className = element.className.replace('outline-transparent', 'outline-base-content');
		allCliparooThemeButtons.forEach((el) => {
			if (el !== element) {
				el.className = el.className.replace('outline-base-content', 'outline-transparent');
			}
		})
		// Set the theme using the `setTheme` function
		document.getElementById('button-preview').setAttribute('data-theme', theme);
	});
});


// ===============================
// Version and Download Management
// ===============================
async function fetchDownloadStats() {
	try {
		const releasesResponse = await fetch(
			'https://api.github.com/repos/abdenasser/neohtop/releases'
		);
		const releases = await releasesResponse.json();
		const githubDownloads = releases.reduce((total, release) => {
			const releaseDownloads = release.assets.reduce((sum, asset) => sum + asset.download_count, 0);
			return total + releaseDownloads;
		}, 0);

		const brewResponse = await fetch(
			'https://formulae.brew.sh/api/analytics/install/homebrew-core/365d.json'
		);
		const brewData = await brewResponse.json();
		const brewInstalls = brewData.formulae?.neohtop?.[0]?.count || 0;

		const totalDownloads = githubDownloads + brewInstalls;
		document.getElementById('download-count').textContent = new Intl.NumberFormat().format(
			totalDownloads
		);
	} catch (error) {
		console.error('Failed to fetch download stats:', error);
		document.getElementById('download-count').textContent = 'N/A';
	}
}

async function updateVersion() {
	try {
		const response = await fetch('https://api.github.com/repos/Abdenasser/neohtop/releases/latest');
		const data = await response.json();
		const version = data.tag_name;
		const versionNumber = version.match(/\d+\.\d+\.\d+/)?.[0];

		if (versionNumber) {
			document.getElementById('current-version').textContent = 'v' + versionNumber;
			updateDownloadLinks(versionNumber);
		}
	} catch (error) {
		console.error('Failed to fetch version:', error);
	}
}

function updateDownloadLinks(versionNumber) {
	const platformUrls = {
		'macos-intel': `intel-NeoHtop_${versionNumber}_x64.dmg`,
		'macos-silicon': `silicon-NeoHtop_${versionNumber}_aarch64.dmg`,
		windows: `NeoHtop_${versionNumber}_x64.exe`,
		'linux-deb-x64': `NeoHtop_${versionNumber}_x86_64.deb`,
		'linux-appimage-x64': `NeoHtop_${versionNumber}_x86_64.AppImage`,
		'linux-rpm-x64': `NeoHtop_${versionNumber}_x86_64.rpm`,
		'linux-deb-arm64': `NeoHtop_${versionNumber}_aarch64.deb`,
		'linux-appimage-arm64': `NeoHtop_${versionNumber}_aarch64.AppImage`,
		'linux-rpm-arm64': `NeoHtop_${versionNumber}_aarch64.rpm`
	};

	document.querySelectorAll('.download-button').forEach((link) => {
		const platform = link.getAttribute('data-type');
		if (platformUrls[platform]) {
			link.href = `https://github.com/Abdenasser/neohtop/releases/download/v${versionNumber}/${platformUrls[platform]}`;
		}
	});
}

// ===============================
// UI Interactions
// ===============================
// FAQ Accordion
document.querySelectorAll('.faq-question').forEach((button) => {
	button.addEventListener('click', () => {
		const faqItem = button.parentElement;
		const isActive = faqItem.classList.contains('active');
		document.querySelectorAll('.faq-item').forEach((item) => item.classList.remove('active'));
		if (!isActive) faqItem.classList.add('active');
	});
});

// Download tracking
document.querySelectorAll('.download-button').forEach((button) => {
	button.addEventListener('click', (e) => {
		gtag('event', 'download', {
			event_category: 'App',
			event_label: button.getAttribute('data-type'),
			value: button.getAttribute('data-version')
		});
	});
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});
});
