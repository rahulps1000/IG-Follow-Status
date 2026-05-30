const themeBtn = document.getElementById("themeBtn");
const popover = document.getElementById("themePopover");
const themeOptions = document.querySelectorAll(".theme-option");

const enabledCheckbox = document.getElementById("enabled");
const tooltipsCheckbox = document.getElementById("tooltips");
const compactCheckbox = document.getElementById("compactMode");

const styleButtons = document.querySelectorAll(".segment button");

async function loadSettings() {
	const settings = await getSettings();

	console.log(settings);

	enabledCheckbox.checked = settings.enabled;
	tooltipsCheckbox.checked = settings.showTooltips;
	compactCheckbox.checked = settings.compactMode;

	if (settings.badgeStyle !== "text") {
		compactCheckbox.disabled = true;
	} else {
		compactCheckbox.disabled = false;
	}

	styleButtons.forEach((btn) => {
		btn.classList.remove("active");
		if (btn.dataset.style === settings.badgeStyle) {
			btn.classList.add("active");
		}
	});

	applyTheme(settings.theme);

	themeOptions.forEach((option) => {
		option.classList.remove("active");
		if (option.dataset.theme === settings.theme) {
			option.classList.add("active");
		}
	});
}

loadSettings();

enabledCheckbox.addEventListener("change", async () => {
	await saveSettings({
		enabled: enabledCheckbox.checked,
	});
});

tooltipsCheckbox.addEventListener("change", async () => {
	await saveSettings({
		showTooltips: tooltipsCheckbox.checked,
	});
});

compactCheckbox.addEventListener("change", async () => {
	await saveSettings({
		compactMode: compactCheckbox.checked,
	});
});

styleButtons.forEach((btn) => {
	btn.addEventListener("click", async () => {
		const style = btn.dataset.style;

		styleButtons.forEach((b) => {
			b.classList.remove("active");
		});

		btn.classList.add("active");

		if (style != "text") {
			compactCheckbox.disabled = true;
		} else {
			compactCheckbox.disabled = false;
		}

		await saveSettings({
			badgeStyle: style,
		});

		console.log("Badge style:", style);
	});
});

themeBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	popover.classList.toggle("hidden");
});

document.addEventListener("click", () => {
	popover.classList.add("hidden");
});

themeOptions.forEach((option) => {
	option.addEventListener("click", async () => {
		const theme = option.dataset.theme;

		themeOptions.forEach((btn) => {
			btn.classList.remove("active");
		});

		option.classList.add("active");

		applyTheme(theme);

		await saveSettings({
			theme,
		});

		popover.classList.add("hidden");
	});
});

function getResolvedTheme(theme) {
	if (theme === "light") {
		return "light";
	}

	if (theme === "dark") {
		return "dark";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme) {
	document.body.dataset.theme = getResolvedTheme(theme);
}

window
	.matchMedia("(prefers-color-scheme: dark)")
	.addEventListener("change", async () => {
		const settings = await getSettings();

		if (settings.theme === "system") {
			applyTheme("system");
		}
	});
