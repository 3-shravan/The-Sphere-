import { useEffect } from "react";

/**
 * Prevent Lenis from intercepting wheel/touch events
 * inside any element matching `selector`.
 * useIgnoreLenisScroll(".js-native-scroll");
 */

export default function useIgnoreLenisScroll(selector = ".js-native-scroll") {
	useEffect(() => {
		const handler = (e) => {
			const el = document.querySelector(selector);
			if (el && el.contains(e.target)) {
				// Stop Lenis from hijacking
				e.stopImmediatePropagation();
				// Let native scroll happen
			}
		};

		window.addEventListener("wheel", handler, { capture: true });
		window.addEventListener("touchmove", handler, { capture: true });

		return () => {
			window.removeEventListener("wheel", handler, { capture: true });
			window.removeEventListener("touchmove", handler, { capture: true });
		};
	}, [selector]);
}
