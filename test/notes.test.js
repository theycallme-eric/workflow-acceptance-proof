import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidNote,
  addNote,
  removeNote,
  serializeNotes,
  deserializeNotes,
} from "../src/notes.js";

test("accepts trimmed non-empty notes", () => {
  const notes = addNote([], "  buy milk  ");
  assert.deepEqual(notes, ["buy milk"]);
  assert.deepEqual(addNote(notes, "walk dog"), ["buy milk", "walk dog"]);
  assert.equal(isValidNote("hello"), true);
});

test("rejects empty and whitespace-only notes", () => {
  assert.equal(isValidNote(""), false);
  assert.equal(isValidNote("   "), false);
  assert.equal(isValidNote("\t\n"), false);
  assert.throws(() => addNote([], ""));
  assert.throws(() => addNote([], "   "));
  assert.throws(() => addNote(["kept"], "\n\t "));
});

test("removes individual notes while preserving order of the rest", () => {
  const notes = ["a", "b", "c"];
  assert.deepEqual(removeNote(notes, 1), ["a", "c"]);
  assert.deepEqual(removeNote(notes, 0), ["b", "c"]);
  assert.deepEqual(removeNote(notes, 2), ["a", "b"]);
  // original list is not mutated
  assert.deepEqual(notes, ["a", "b", "c"]);
  assert.throws(() => removeNote(notes, 3));
  assert.throws(() => removeNote(notes, -1));
});

test("serializes to and from a JSON array", () => {
  const notes = ["one", "two"];
  const json = serializeNotes(notes);
  assert.equal(json, '["one","two"]');
  assert.deepEqual(deserializeNotes(json), notes);
});

test("deserialization handles invalid input safely", () => {
  assert.deepEqual(deserializeNotes("not json"), []);
  assert.deepEqual(deserializeNotes('{"a":1}'), []);
  assert.deepEqual(deserializeNotes('["ok", "", "  ", "  trimmed  "]'), [
    "ok",
    "trimmed",
  ]);
});
