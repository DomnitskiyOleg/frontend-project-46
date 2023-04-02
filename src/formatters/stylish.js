import _ from 'lodash';

const getIndent = (depth, corrective = 0, spaceCount = 4) => ' '.repeat(depth * spaceCount + spaceCount + corrective);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    if (_.isObject(value)) {
      return `${getIndent(depth)}${key}: ${stringify(value, depth + 1)}`;
    }
    return `${getIndent(depth)}${key}: ${value}`;
  });
  return ['{', ...stringEntries, `${getIndent(depth, -4)}}`].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth) => {
    if (!_.isArray(node)) {
      const { name, type } = node;
      switch (type) {
        case 'removed':
          return `${getIndent(depth, -2)}- ${name}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${getIndent(depth, -2)}+ ${name}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}${name}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${getIndent(depth, -2)}- ${name}: ${stringify(node.value1, depth + 1)}`,
            `${getIndent(depth, -2)}+ ${name}: ${stringify(node.value2, depth + 1)}`].join('\n');
        default:
          throw new Error(`Unknown type '${type}`);
      }
    }
    const result = node.map((item) => {
      if (item.type === 'nested') {
        const { children } = item;
        return `${getIndent(depth)}${item.name}: ${iter(children, depth + 1)}`;
      }
      return iter(item, depth);
    });
    return ['{', ...result, `${getIndent(depth, -4)}}`].join('\n');
  };
  return iter(diffTree, 0);
};

export default getStylishFormat;
