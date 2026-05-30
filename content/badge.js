function createBadge(relationship, settings) {
	const badge = document.createElement("span");

	badge.id = "ig-follow-status";

	switch (settings.badgeStyle) {
		case "dot":
			badge.style.width = "12px";
			badge.style.height = "12px";
			badge.style.borderRadius = "50%";
			badge.style.padding = "0";
			badge.style.margin = "0 8px";
			break;

		case "text":
			badge.textContent = relationship.label;
			if (settings.compactMode) {
				badge.textContent = relationship.shortLabel;
			}
			badge.style.marginLeft = "8px";
			badge.style.padding = "4px 10px";
			break;

		case "color":
			badge.textContent = relationship.label;
			badge.style.marginLeft = "8px";
			badge.style.padding = "4px 10px";
			break;

		default:
			badge.textContent = relationship.label;
			badge.style.marginLeft = "8px";
			badge.style.padding = "4px 10px";
			break;
	}

	if (settings.showTooltips) {
		badge.title = relationship.label;
	}

	badge.style.borderRadius = "999px";
	badge.style.fontSize = "12px";
	badge.style.fontWeight = "600";
	badge.style.background = relationship.color;
	badge.style.color = "#fff";

	return badge;
}
