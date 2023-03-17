import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedStylish = [
  '{',
  '    common: {',
  '      + follow: false',
  '        setting1: Value 1',
  '      - setting2: 200',
  '      - setting3: true',
  '      + setting3: null',
  '      + setting4: blah blah',
  '      + setting5: {',
  '            key5: value5',
  '        }',
  '        setting6: {',
  '            doge: {',
  '              - wow: ',
  '              + wow: so much',
  '            }',
  '            key: value',
  '          + ops: vops',
  '        }',
  '    }',
  '    group1: {',
  '      - baz: bas',
  '      + baz: bars',
  '        foo: bar',
  '      - nest: {',
  '            key: value',
  '        }',
  '      + nest: str',
  '    }',
  '  - group2: {',
  '        abc: 12345',
  '        deep: {',
  '            id: 45',
  '        }',
  '    }',
  '  + group3: {',
  '        deep: {',
  '            id: {',
  '                number: 45',
  '            }',
  '        }',
  '        fee: 100500',
  '    }',
  '}',
].join('\n');

test('flat json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  const actual = gendiff(path1, path2);
  expect(actual).toEqual(expectedStylish);
});
test('flat yaml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  const actual = gendiff(path1, path2);
  expect(actual).toEqual(expectedStylish);
});
