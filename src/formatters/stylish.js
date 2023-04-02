import _ from 'lodash';

const getSpace = (count) => ' '.repeat(count);

const stringify = (data, depth, spaceCount = 4) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    const actualSpaceCount = spaceCount * depth;

    if (_.isObject(value)) {
      return `${getSpace(actualSpaceCount)}${key}: ${stringify(value, depth + 1)}`;
    }
    return `${getSpace(actualSpaceCount)}${key}: ${value}`;
  });
  return ['{', ...stringEntries, `${getSpace(depth * spaceCount - spaceCount)}}`].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth, spaceCount = 4) => {
    if (!_.isArray(node)) {
      const { name, type } = node;
      switch (node.type) {
        case 'removed':
          return `${getSpace(spaceCount * depth - 2)}- ${name}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${getSpace(spaceCount * depth - 2)}+ ${name}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${getSpace(spaceCount * depth)}${name}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${getSpace(spaceCount * depth - 2)}- ${name}: ${stringify(node.value1, depth + 1)}`,
            `${getSpace(spaceCount * depth - 2)}+ ${name}: ${stringify(node.value2, depth + 1)}`].join('\n');
        default:
          throw new Error(`Unknown type '${type}`);
      }
    }
    const result = node.map((item) => {
      if (item.type === 'nested') {
        const { children } = item;
        return `${getSpace(spaceCount * depth)}${item.name}: ${iter(children, depth + 1)}`;
      }
      return iter(item, depth);
    });
    return ['{', ...result, `${getSpace(depth * spaceCount - spaceCount)}}`].join('\n');
  };
  return iter(diffTree, 1);
};

export default getStylishFormat;
