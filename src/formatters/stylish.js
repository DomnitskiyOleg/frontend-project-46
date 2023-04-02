import _ from 'lodash';

const getSpace = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    if (_.isObject(value)) {
      return `${getSpace(depth)}  ${key}: ${stringify(value, depth + 1)}`;
    }
    return `${getSpace(depth)}  ${key}: ${value}`;
  });
  return ['{', ...stringEntries, `${'    '.repeat(depth - 1)}}`].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth) => {
    if (!_.isArray(node)) {
      const { name, type } = node;
      switch (type) {
        case 'removed':
          return `${getSpace(depth)}- ${name}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${getSpace(depth)}+ ${name}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${getSpace(depth)}  ${name}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${getSpace(depth)}- ${name}: ${stringify(node.value1, depth + 1)}`,
            `${getSpace(depth)}+ ${name}: ${stringify(node.value2, depth + 1)}`].join('\n');
        default:
          throw new Error(`Unknown type '${type}`);
      }
    }
    const result = node.map((item) => {
      if (item.type === 'nested') {
        const { children } = item;
        return `${getSpace(depth)}  ${item.name}: ${iter(children, depth + 1)}`;
      }
      return iter(item, depth);
    });
    return ['{', ...result, `${'    '.repeat(depth - 1)}}`].join('\n');
  };
  return iter(diffTree, 1);
};

export default getStylishFormat;
