import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formatOutput = (diffData, formatName) => {
  switch (formatName) {
    case 'plain':
      return getPlainFormat(diffData);
    case 'json':
      return getJsonFormat(diffData);
    default:
      return getStylishFormat(diffData);
  }
};
export default formatOutput;
