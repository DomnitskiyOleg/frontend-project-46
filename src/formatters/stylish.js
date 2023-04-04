import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount + 2);
const getBracketIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    if (_.isObject(value)) {
      return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
    }
    return `${getIndent(depth)}  ${key}: ${value}`;
  });
  return ['{', ...stringEntries, `${getBracketIndent(depth)}}`].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth) => {
    const stylish = node.map((item) => {
      const { name, type } = item;

      switch (type) {
        case 'removed':
          return `${getIndent(depth)}- ${name}: ${stringify(item.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth)}+ ${name}: ${stringify(item.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${name}: ${stringify(item.value, depth + 1)}`;
        case 'updated':
          return [
            `${getIndent(depth)}- ${name}: ${stringify(item.value1, depth + 1)}`,
            `${getIndent(depth)}+ ${name}: ${stringify(item.value2, depth + 1)}`].join('\n');
        case 'nested':
          return `${getIndent(depth)}  ${item.name}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`Unknown type '${type}`);
      }
    });
    return ['{', ...stylish, `${getBracketIndent(depth)}}`].join('\n');
  };
  return iter(diffTree, 0);
};

export default getStylishFormat;
