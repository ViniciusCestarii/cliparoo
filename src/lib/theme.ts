import { formatRgb, convertOkhslToOklab } from 'culori';

function parseStringToHSL(input: string) {
	const [lightnessStr, saturationStr, hueStr] = input.split(' ');
	const lightness = parseFloat(lightnessStr.slice(0, -1)) / 100;
	const saturation = parseFloat(saturationStr);
	const hue = parseFloat(hueStr);
	return { h: hue, s: saturation, l: lightness };
}

export function getColors() {
	const style = getComputedStyle(document.documentElement);

	const primaryHSL = style.getPropertyValue('--p').trim();
	const secondaryHSL = style.getPropertyValue('--s').trim();
	const accentHSL = style.getPropertyValue('--a').trim();
	const neutralHSL = style.getPropertyValue('--n').trim();

	const primaryColorOkLab = convertOkhslToOklab(parseStringToHSL(primaryHSL));
	const primary = formatRgb(primaryColorOkLab);

	const secondaryColorOkLab = convertOkhslToOklab(parseStringToHSL(secondaryHSL));
	const secondary = formatRgb(secondaryColorOkLab);

	const accentColorOkLab = convertOkhslToOklab(parseStringToHSL(accentHSL));
	const accent = formatRgb(accentColorOkLab);

	const neutralColorOkLab = convertOkhslToOklab(parseStringToHSL(neutralHSL));
	const neutral = formatRgb(neutralColorOkLab);

	return { primary, secondary, accent, neutral };
}

export const getColorsArray = () => {
	const colors = getColors();
	// 	type: 'contact'| 'file-path' | 'text' | 'url';
	return [colors.secondary, colors.neutral, colors.primary, colors.accent];
};
