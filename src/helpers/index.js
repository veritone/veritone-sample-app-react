/**
 * Parses url query string value
 * @param  {STRING} key - query string key
 * @return {STRING} value - query string key value
 */
export function getQueryStringValue(key) {
	return decodeURIComponent(
		window.location.search.replace(
			new RegExp("^(?:.*[&\\?]" +
			encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
			"(?:\\=([^&]*))?)?.*$", "i"), "$1"
		)
	);
}

/**
 * Checks whether an object is empty
 * @param  {Object} obj
 * @return {Boolean}
 */
export function isEmpty(obj) {
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			return false;
		}
	}
	return true;
}
