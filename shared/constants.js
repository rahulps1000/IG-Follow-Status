const DEFAULT_SETTINGS = {
	enabled: true,
	badgeStyle: "text",
	theme: "system",
	showTooltips: true,
	compactMode: false,
	debugMode: false,
	reinjectBadge: true,
};

Object.freeze(DEFAULT_SETTINGS);

const RELATIONSHIP_STATUS = {
	MUTUAL: {
		key: "mutual",
		label: "Mutual Follow",
		shortLabel: "Mutual",
		color: "#22c55e",
	},

	FOLLOWS_YOU: {
		key: "follows_you",
		label: "Follows You",
		shortLabel: "Follower",
		color: "#eab308",
	},

	YOU_FOLLOW: {
		key: "you_follow",
		label: "You Follow",
		shortLabel: "Following",
		color: "#3b82f6",
	},

	NONE: {
		key: "none",
		label: "No Connection",
		shortLabel: "None",
		color: "#ef4444",
	},
};

Object.freeze(RELATIONSHIP_STATUS);
