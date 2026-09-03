// DOM wiring for notes.html. Persists notes in localStorage and
// delegates list logic to the pure module in src/notes.js.

import {
  addNote,
  deserializeNotes,
  isValidNote,
  removeNote,
  serializeNotes,
} from "./notes.js";

export const STORAGE_KEY = "parallel-proof-notes";
const ERROR_MESSAGE = "Enter a note before adding it.";

const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const errorEl = document.querySelector("#note-error");
const listEl = document.querySelector("#note-list");

let notes = deserializeNotes(localStorage.getItem(STORAGE_KEY));

function persist() {
  localStorage.setItem(STORAGE_KEY, serializeNotes(notes));
}

function render() {
  listEl.textContent = "";
  notes.forEach((text, index) => {
    const item = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = text;
    item.append(label);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      notes = removeNote(notes, index);
      persist();
      render();
    });
    item.append(removeButton);

    listEl.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  if (!isValidNote(value)) {
    errorEl.textContent = ERROR_MESSAGE;
    return;
  }
  notes = addNote(notes, value);
  persist();
  input.value = "";
  errorEl.textContent = "";
  render();
});

render();
