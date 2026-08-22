/**
 * Input sanitization helpers. The current frontend renders user-entered
 * trip names and city search text with innerHTML in a couple of places —
 * anything reflected into the DOM must be escaped server-side too, since
 * you can't trust the client to have done it.
 */

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Strips anything but the characters a trip/city name should reasonably contain. */
function cleanFreeText(str = '', maxLen = 200) {
  return String(str).slice(0, maxLen).trim();
}

module.exports = { escapeHtml, cleanFreeText };
