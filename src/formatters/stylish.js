import _ from 'lodash';

const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount + spaceCount);

const stringify = (data, depth) => {
  const bracketDepth = depth - 1;
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    if (_.isObject(value)) {
      return `${getIndent(depth)}${key}: ${stringify(value, depth + 1)}`;
    }
    return `${getIndent(depth)}${key}: ${value}`;
  });
  return ['{', ...stringEntries, `${getIndent(bracketDepth)}}`].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth) => {
    if (!_.isArray(node)) {
      const corrective = 0.5;
      const correctedDepth = depth - corrective;
      const { name, type } = node;
      switch (type) {
        case 'removed':
          return `${getIndent(correctedDepth)}- ${name}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${getIndent(correctedDepth)}+ ${name}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${getIndent(depth)}${name}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${getIndent(correctedDepth)}- ${name}: ${stringify(node.value1, depth + 1)}`,
            `${getIndent(correctedDepth)}+ ${name}: ${stringify(node.value2, depth + 1)}`].join('\n');
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
    const bracketDepth = depth - 1;
    return ['{', ...result, `${getIndent(bracketDepth)}}`].join('\n');
  };
  return iter(diffTree, 0);
};

export default getStylishFormat;
