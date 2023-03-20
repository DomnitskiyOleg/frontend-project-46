import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = readFileSync(getFixturePath('nested-stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('nested-plain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('nested-json.txt'), 'utf-8');

test('stylish-format json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const actual = gendiff(path1, path2);
  expect(actual).toEqual(expectedStylish);
});
test('stylish-format yaml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const actual = gendiff(path1, path2);
  expect(actual).toEqual(expectedStylish);
});
test('plain-format json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const actual = gendiff(path1, path2, 'plain');
  expect(actual).toEqual(expectedPlain);
});
test('plain-format yaml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const actual = gendiff(path1, path2, 'plain');
  expect(actual).toEqual(expectedPlain);
});

test('json-format json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const actual = gendiff(path1, path2, 'json');
  expect(actual).toEqual(expectedJson);
});
test('json-format yaml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const actual = gendiff(path1, path2, 'json');
  expect(actual).toEqual(expectedJson);
});
