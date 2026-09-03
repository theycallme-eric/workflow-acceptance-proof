// Pure note-list behavior. No DOM or storage APIs; safe for Node unit tests.

/**
 * Returns true when the value is a string with non-whitespace content.
 */
export function isValidNote(text) {
  return typeof text === "string" && text.trim().length > 0;
}

/**
 * Returns a new array with the trimmed note appended.
 * Throws if the note is empty or whitespace-only.
 */
export function addNote(notes, text) {
  if (!isValidNote(text)) {
    throw new Error("Note text must be a non-empty string");
  }
  return [...notes, text.trim()];
}

/**
 * Returns a new array with the note at the given index removed,
 * preserving the order of the remaining notes.
 * Throws if the index is out of range.
 */
export function removeNote(notes, index) {
  if (!Number.isInteger(index) || index < 0 || index >= notes.length) {
    throw new RangeError(`No note at index ${index}`);
  }
  return notes.filter((_, i) => i !== index);
}

/**
 * Serializes the notes to a JSON array string.
 */
export function serializeNotes(notes) {
  return JSON.stringify(notes);
}

/**
 * Parses a JSON array string back into a note list.
 * Invalid input yields an empty list; invalid entries are dropped
 * and remaining entries are trimmed.
 */
export function deserializeNotes(json) {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed.filter(isValidNote).map((text) => text.trim());
}
