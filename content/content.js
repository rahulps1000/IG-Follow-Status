let currentRelationship = null;

const script = document.createElement("script");

script.src = chrome.runtime.getURL("content/inject.js");

document.documentElement.appendChild(script);

script.remove();

window.addEventListener("message", (event) => {
	if (event.source !== window) {
		return;
	}

	if (event.data?.type !== "FOLLOW_STATUS") {
		return;
	}

	currentRelationship = getRelationshipStatus(
		event.data.following,
		event.data.followedBy,
	);

	setTimeout(() => {
		renderBadge(currentRelationship);
	}, 1000);
});

function findUsernameElement() {
	return document.querySelector("header h2");
}

function getRelationshipStatus(following, followedBy) {
	if (following && followedBy) {
		return RELATIONSHIP_STATUS.MUTUAL;
	}

	if (followedBy) {
		return RELATIONSHIP_STATUS.FOLLOWS_YOU;
	}

	if (following) {
		return RELATIONSHIP_STATUS.YOU_FOLLOW;
	}

	return RELATIONSHIP_STATUS.NONE;
}

async function renderBadge(relationship) {
	const settings = await getSettings();

	const existing = document.getElementById("ig-follow-status");

	const username = findUsernameElement();

	if (!username) {
		console.log("Username not found");
		return;
	}
	if (existing) {
		existing.remove();
	}

	if (!settings.enabled) {
		username.style.color = "";
		username.title = "";
		return;
	}

	if (settings.badgeStyle === "color") {
		username.style.color = relationship.color;
		username.title = relationship.label;
		return;
	}

	username.style.color = "";
	username.title = "";

	const badge = createBadge(relationship, settings);
	username.insertAdjacentElement("afterend", badge);
}

chrome.storage.onChanged.addListener(() => {
	if (currentRelationship) {
		renderBadge(currentRelationship);
	}
});
