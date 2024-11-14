import { info } from '@tauri-apps/plugin-log';
import { formatRgb, convertOkhslToOklab } from 'culori';


function parseStringToHSL(input: string) {
    const [lightnessStr, saturationStr, hueStr] = input.split(" ");
    const lightness = parseFloat(lightnessStr.slice(0, -1)) / 100;
    const saturation = parseFloat(saturationStr);
    const hue = parseFloat(hueStr);
    return { h: hue, s: saturation, l: lightness };
}

export function getColors() {
    let primary = '';
    let secondary = '';
    let accent = '';

    const style = getComputedStyle(document.documentElement);

    // Get primary, secondary, and accent colors
    const newPrimary = style.getPropertyValue('--p').trim();
    const newSecondary = style.getPropertyValue('--s').trim();
    const newAccent = style.getPropertyValue('--a').trim();

    // Update colors if they have changed
    const primaryColorOkLab = convertOkhslToOklab(parseStringToHSL(newPrimary));
    primary = formatRgb(primaryColorOkLab)


    const secondaryColorOkLab = convertOkhslToOklab(parseStringToHSL(newSecondary));
    secondary = formatRgb(secondaryColorOkLab)


    const accentColorOkLab = convertOkhslToOklab(parseStringToHSL(newAccent));
    accent = formatRgb(accentColorOkLab)

    return { primary, secondary, accent };
}

