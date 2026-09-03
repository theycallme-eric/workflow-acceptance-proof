// Pure note-list logic. No browser APIs; safe to run under Node.

/**
 * Returns true when the text is a valid note (non-empty after trimming).
 */
export function isValidNote(text) {
  return typeof text === "string" && text.trim().length > 0;
}

/**
 * Returns a new list with the trimmed note appended.
 * Throws if the note is empty or whitespace-only.
 */
export function addNote(notes, text) {
  if (!isValidNote(text)) {
    throw new Error("Note must be non-empty after trimming");
  }
  return [...notes, text.trim()];
}

/**
 * Returns a new list with the note at the given index removed.
 * Throws if the index is out of range.
 */
export function removeNote(notes, index) {
  if (!Number.isInteger(index) || index < 0 || index >= notes.length) {
    throw new Error("Note index out of range");
  }
  return notes.filter((_, i) => i !== index);
}

/**
 * Serializes the note list to a JSON array string.
 */
export function serializeNotes(notes) {
  return JSON.stringify(notes);
}

/**
 * Deserializes a JSON array string into a note list.
 * Invalid JSON or non-array input yields an empty list; entries are
 * filtered to valid notes and trimmed.
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
  return parsed.filter(isValidNote).map((note) => note.trim());
}
