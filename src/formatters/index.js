import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formatOutput = (diffData, formatName) => {
  if (formatName === 'plain') return getPlainFormat(diffData);
  if (formatName === 'json') return getJsonFormat(diffData);
  return getStylishFormat(diffData);
};
export default formatOutput;
