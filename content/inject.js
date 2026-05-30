const originalOpen = XMLHttpRequest.prototype.open;

const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url, ...rest) {
	this._url = url;

	return originalOpen.call(this, method, url, ...rest);
};

XMLHttpRequest.prototype.send = function (body) {
	const isProfileRequest =
		this._url.includes("/api/graphql") &&
		typeof body === "string" &&
		body.includes("PolarisProfilePageContentQuery");

	if (isProfileRequest) {
		this.addEventListener("load", () => {
			try {
				const data = JSON.parse(this.responseText);

				const following = data.data.user.friendship_status.following;
				const followedBy = data.data.user.friendship_status.followed_by;

				window.postMessage({
					type: "FOLLOW_STATUS",
					following,
					followedBy,
				});
			} catch (error) {
				console.error("JSON Parse Error:", error);
			}
		});
	}

	return originalSend.call(this, body);
};
