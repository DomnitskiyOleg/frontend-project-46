import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formatOutput = (diffData, formatName = 'stylish') => {
  switch (formatName) {
    case 'plain':
      return getPlainFormat(diffData);
    case 'json':
      return getJsonFormat(diffData);
    case 'stylish':
      return getStylishFormat(diffData);
    default:
      throw new Error(`Unknown output format '${formatName}`);
  }
};
export default formatOutput;
