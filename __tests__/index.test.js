import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = readFileSync(getFixturePath('nested-stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('nested-plain.txt'), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', expectedStylish],
  ['file1.yml', 'file2.yml', 'stylish', expectedStylish],
  ['file1.json', 'file2.json', 'plain', expectedPlain],
  ['file1.yml', 'file2.yml', 'plain', expectedPlain],
])('test(%s, %s, %s)', (file1, file2, format, expected) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  const actual = gendiff(path1, path2, format);
  expect(actual).toEqual(expected);
});

test.each([
  ['file1.json', 'file2.json', 'json'],
  ['file1.yml', 'file2.yml', 'json'],
])('test(%s, %s, %s)', (file1, file2, format) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  const actual = gendiff(path1, path2, format);
  expect(() => JSON.parse(actual)).not.toThrow();
});
test('test(unknown format)', () => {
  const path1 = getFixturePath('file1.txt');
  const path2 = getFixturePath('file2.json');
  expect(() => gendiff(path1, path2)).toThrow();
});
