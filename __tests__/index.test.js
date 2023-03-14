import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('flat JSON', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const expected = ['{',
    '  - follow: false',
    '    host: hexlet.io',
    '  - proxy: 123.234.53.22',
    '  + somekey: value',
    '  - timeout: 50',
    '  + timeout: 20',
    '  + verbose: true',
    '}'].join('\n');
  const actual = gendiff(path1, path2);
  expect(actual).toBe(expected);
});
