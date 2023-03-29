import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = readFileSync(getFixturePath('nested-stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('nested-plain.txt'), 'utf-8');

test.each(['json', 'yml', 'yaml'])('test(%s)', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);
  const path3 = getFixturePath('file1.txt');

  const actual1 = gendiff(path1, path2, 'stylish');
  const actual2 = gendiff(path1, path2, 'plain');
  const actual3 = gendiff(path1, path2, 'json');

  expect(actual1).toEqual(expectedStylish);
  expect(actual2).toEqual(expectedPlain);
  expect(() => JSON.parse(actual3)).not.toThrow();
  expect(() => gendiff(path1, path2, 'wrong format')).toThrow();
  expect(() => gendiff(path3, path2)).toThrow();
});
