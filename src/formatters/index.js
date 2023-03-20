import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';

const formatOutput = (diffData, formatName) => {
  if (formatName === 'plain') return getPlainFormat(diffData);
  return getStylishFormat(diffData);
};
export default formatOutput;
