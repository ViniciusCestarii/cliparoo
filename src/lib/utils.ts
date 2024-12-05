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
