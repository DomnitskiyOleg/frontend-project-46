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
  ['.json', 'stylish', expectedStylish],
  ['.yml', 'stylish', expectedStylish],
  ['.yaml', 'stylish', expectedStylish],
  ['.json', 'plain', expectedPlain],
  ['.yml', 'plain', expectedPlain],
  ['.yaml', 'plain', expectedPlain],
])('test(%s, %s)', (extension, format, expected) => {
  const path1 = getFixturePath(`file1${extension}`);
  const path2 = getFixturePath(`file2${extension}`);

  const actual = gendiff(path1, path2, format);
  const actual1 = gendiff(path1, path2, 'json');

  expect(actual).toEqual(expected);
  expect(() => JSON.parse(actual1)).not.toThrow();
  expect(() => gendiff(path1, path2, 'plainn')).toThrow();
});

test('test(unknown format)', () => {
  const path1 = getFixturePath('file1.txt');
  const path2 = getFixturePath('file2.json');
  expect(() => gendiff(path1, path2)).toThrow();
});
