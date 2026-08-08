function trackEvent({ name, value }) {
	if (window.goatcounter?.count) {
		window.goatcounter.count({
			path: value || name,
			event: true,
		})
	}
}

export default trackEvent
