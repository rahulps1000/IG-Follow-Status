async function getSettings() {
	return chrome.storage.local.get(DEFAULT_SETTINGS);
}

async function saveSettings(settings) {
	return chrome.storage.local.set(settings);
}
