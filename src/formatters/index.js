import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';

const formatOutput = (diffData, format) => {
  if (format === 'plain') return getPlainFormat(diffData);
  return getStylishFormat(diffData);
};
export default formatOutput;
