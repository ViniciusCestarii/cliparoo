import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ClipboardEntry } from './types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUserPreferredColorScheme() {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	} else {
		return 'light';
	}
}

export const getType = (text: ClipboardEntry['text']): ClipboardEntry['type'] => {
	const cleanText = text.trim();
	if (checkIfUrl(cleanText)) return 'url';
	if (checkIfContact(cleanText)) return 'contact';
	if (checkIfFilePath(cleanText)) return 'file-path';
	return 'text';
};

const checkIfContact = (text: string) => {
	const textWithoutSpacesAndHyphens = text.replace(/[\s-]/g, '');

	return EMAIL_REGEX.exec(text) || PHONE_REGEX.exec(textWithoutSpacesAndHyphens);
};

const checkIfFilePath = (text: string) =>
	WINDOWS_FILE_PATH_REGEX.exec(text) || UNIX_FILE_PATH_REGEX.exec(text);

const WINDOWS_FILE_PATH_REGEX = /[a-zA-Z]:[\\\/](?:[a-zA-Z0-9]+[\\\/])*([a-zA-Z0-9]+)/;

const UNIX_FILE_PATH_REGEX = /^\/(?:[\w]+\/)*[\w]+(?:\.[\w]+)?$/;

const PHONE_REGEX = /^\+?[1-9][0-9]{7,14}$/;

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const checkIfUrl = (text: string) => URL_REGEX.exec(text);

const URL_REGEX =
	/^(https?:\/\/(?:www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;


function parseFilter(filterStr: string) {
	// Ensure values with spaces are quoted
	filterStr = filterStr.replace(/(\w+):([^"\s]+)(?=\s|$)/g, '$1:"$2"'); // Add quotes to non-quoted values with spaces

	const filters: Record<string, string> = {};
	const regex = /(\w+):"([^"]*)"/g;
	let match;

	while ((match = regex.exec(filterStr)) !== null) {
		const key = match[1];
		const value = match[2];
		filters[key] = value;
	}

	return filters;
}

export function filterClipboard(clipboards: ClipboardEntry[], search: string) {
	const upperSearch = search.toUpperCase();

	const isNoFilter = upperSearch.startsWith('NOFILTER ');

	const adjustedSearch = isNoFilter ? upperSearch.slice(9) : upperSearch;

	const filters = isNoFilter ? {} : parseFilter(adjustedSearch);

	if (Object.keys(filters).length > 0) {
		return clipboards.filter((entry) => {
			return Object.entries(filters).every(([key, value]) => {
				if (key === 'TYPE') {
					return entry.type.toUpperCase().includes(value);
				}

				if (key === 'WINDOW') {
					return entry.window.toUpperCase().includes(value);
				}

				return entry.text.toUpperCase().includes(value);
			});
		});
	}

	return clipboards.filter(
		(entry) =>
			entry.text.toUpperCase().includes(adjustedSearch) ||
			entry.window.toUpperCase().includes(adjustedSearch) ||
			entry.type.toUpperCase().includes(adjustedSearch)
	);
}