/**
 * [TAG TRANSFORMATION FLOW EXPLAINED]
 *
 * Form input --> FormData --> Backend --> Final usable tag array
 *
 * ┌─────────────────────────────┬────────────────────────────────────────────┬────────────┐
 * │ Step                        │ Value                                      │ Type       │
 * ├─────────────────────────────┼────────────────────────────────────────────┼────────────┤
 * │ formData.get("tags")        │ "art, expression, learn"                   │ string     │
 * │ formatTags(tags)            │ ["art", "expression", "learn"]             │ array      │
 * │ JSON.stringify(...)         │ "["art","expression","learn"]"             │ string     │
 * │ formData.set("tags", ...)   │ same as above                              │ string     │
 * │ req.body.tags (on backend)  │ "["art","expression","learn"]"             │ string     │
 * │ JSON.parse(req.body.tags)   │ ["art", "expression", "learn"]             │ array      │
 * └─────────────────────────────┴────────────────────────────────────────────┴────────────┘
 *
 * 💡 Notes:
 * - This formatting ensures clean, lowercase, unique tags.
 * - Required when sending tags via multipart/form-data.
 * - On backend, always parse JSON: JSON.parse(req.body.tags)
 */

/**
 * Format a raw comma-separated string into an array of cleaned tags.
 *
 * @param {string} rawTags - e.g., " travel,  nature ,Photography, "
 * @returns {string[]} - e.g., ["travel", "nature", "photography"]
 */
export const formatTags = (rawTags = "") => {
  return rawTags
    .split(",")
    .map((tag) => tag.trim().toLowerCase()) // remove extra space & normalize
    .filter((tag) => tag.length > 0) // remove empty entries
    .filter((tag, index, self) => self.indexOf(tag) === index); // remove duplicates
};

/**
 * Convert tag array back into a comma-separated string for editing in input fields.
 *
 * @param {string[]} tagArray - e.g., ["travel", "nature"]
 * @returns {string} - e.g., "travel, nature"
 */
export const stringifyTags = (tagArray = []) => {
  return tagArray.filter(Boolean).join(", ");
};
