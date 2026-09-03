import test from "node:test";
import assert from "node:assert/strict";
import {
  addNote,
  deserializeNotes,
  isValidNote,
  removeNote,
  serializeNotes,
} from "../src/notes.js";

test("addNote appends a trimmed non-empty note", () => {
  const notes = addNote(["first"], "  second note  ");
  assert.deepEqual(notes, ["first", "second note"]);
});

test("addNote does not mutate the original list", () => {
  const original = ["first"];
  addNote(original, "second");
  assert.deepEqual(original, ["first"]);
});

test("addNote rejects an empty note", () => {
  assert.throws(() => addNote([], ""), /non-empty/);
});

test("addNote rejects a whitespace-only note", () => {
  assert.throws(() => addNote([], "   \t\n  "), /non-empty/);
});

test("addNote rejects non-string values", () => {
  assert.throws(() => addNote([], undefined));
  assert.throws(() => addNote([], 42));
});

test("isValidNote reflects trim-based validation", () => {
  assert.equal(isValidNote("hello"), true);
  assert.equal(isValidNote("  padded  "), true);
  assert.equal(isValidNote(""), false);
  assert.equal(isValidNote("   "), false);
  assert.equal(isValidNote(null), false);
});

test("removeNote removes a single note and preserves order of the rest", () => {
  const notes = ["a", "b", "c"];
  assert.deepEqual(removeNote(notes, 1), ["a", "c"]);
  assert.deepEqual(notes, ["a", "b", "c"], "input is not mutated");
});

test("removeNote handles first and last indices", () => {
  assert.deepEqual(removeNote(["a", "b", "c"], 0), ["b", "c"]);
  assert.deepEqual(removeNote(["a", "b", "c"], 2), ["a", "b"]);
});

test("removeNote throws for out-of-range or non-integer indices", () => {
  assert.throws(() => removeNote(["a"], 1), RangeError);
  assert.throws(() => removeNote(["a"], -1), RangeError);
  assert.throws(() => removeNote(["a"], 0.5), RangeError);
});

test("serializeNotes produces a JSON array string", () => {
  assert.equal(serializeNotes(["a", "b"]), '["a","b"]');
  assert.deepEqual(JSON.parse(serializeNotes([])), []);
});

test("deserializeNotes round-trips a serialized list", () => {
  const notes = ["first", "second"];
  assert.deepEqual(deserializeNotes(serializeNotes(notes)), notes);
});

test("deserializeNotes returns empty list for invalid JSON or non-arrays", () => {
  assert.deepEqual(deserializeNotes("not json"), []);
  assert.deepEqual(deserializeNotes('{"a":1}'), []);
});

test("deserializeNotes drops invalid entries and trims the rest", () => {
  assert.deepEqual(deserializeNotes('["  a  ", "", "   ", 3, "b"]'), ["a", "b"]);
});
