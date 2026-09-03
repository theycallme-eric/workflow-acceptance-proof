import test from 'node:test';
import assert from 'node:assert/strict';
import { createCounter } from '../src/counter.js';

test('initial value is 0', () => {
  const counter = createCounter();
  assert.equal(counter.value, 0);
});

test('increment adds exactly 1', () => {
  const counter = createCounter();
  counter.increment();
  assert.equal(counter.value, 1);
  counter.increment();
  assert.equal(counter.value, 2);
});

test('reset returns value to 0', () => {
  const counter = createCounter();
  counter.increment();
  counter.increment();
  counter.reset();
  assert.equal(counter.value, 0);
});
