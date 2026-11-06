import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('counts words and sentences', () => {
  const x = api.analyzeReadability('One clear sentence. Another follows!');
  assert.equal(x.words, 5);
  assert.equal(x.sentences, 2);
});
test('computes syllables for simple words', () => {
  assert.equal(api.analyzeReadability('cat book').syllables, 2);
});
test('returns empty-text sentinel values', () => {
  assert.deepEqual(api.analyzeReadability('  '), {
    words: 0,
    sentences: 0,
    syllables: 0,
    readingEase: 0,
    gradeLevel: 0,
  });
});
test('handles apostrophes as part of a word', () => {
  assert.equal(api.analyzeReadability("can't stop").words, 2);
});
test('scores remain finite without punctuation', () => {
  const x = api.analyzeReadability('This text has no final punctuation');
  assert.ok(Number.isFinite(x.gradeLevel));
});
test('rejects non-text input', () => {
  assert.throws(() => api.analyzeReadability(42), TypeError);
});
