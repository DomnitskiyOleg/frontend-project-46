import _ from 'lodash';

const handleLeaf = (leaf) => {
  const { name, type } = leaf;
  switch (type) {
    case 'removed':
      return { [`- ${name}`]: leaf.value };
    case 'added':
      return { [`+ ${name}`]: leaf.value };
    case 'updated':
      return { [`- ${name}`]: leaf.value1, [`+ ${name}`]: leaf.value2 };
    case 'unchanged':
      return { [`${name}`]: leaf.value };
    default:
      throw new Error(`Unknown type '${type}`);
  }
};

const isLeaf = (node) => !Array.isArray(node);

const getObjectFromDiffTree = (node) => {
  if (isLeaf(node)) {
    return handleLeaf(node);
  }

  const result = node.reduce((acc, item) => {
    if (item.children) {
      const { name, children } = item;
      return { ...acc, [`${name}`]: getObjectFromDiffTree(children) };
    }
    return { ...acc, ...getObjectFromDiffTree(item) };
  }, {});

  return result;
};

const getAmountOfspaces = (key, spaceCount) => {
  if (key.startsWith('-') || key.startsWith('+')) {
    return spaceCount - 2;
  }
  return spaceCount;
};

const stringifyObject = (object) => {
  const iter = (data, depth, spaceCount = 4, replacer = ' ') => {
    const stringEntries = Object.entries(data).map(([key, value]) => {
      const actualSpaceCount = getAmountOfspaces(key, spaceCount * depth);

      if (_.isObject(value)) {
        return `${replacer.repeat(actualSpaceCount)}${key}: ${iter(value, depth + 1)}`;
      }
      return `${replacer.repeat(actualSpaceCount)}${key}: ${value}`;
    });
    return ['{', ...stringEntries, `${replacer.repeat(depth * spaceCount - spaceCount)}}`].join('\n');
  };
  return iter(object, 1);
};

const getStylishFormat = (diffTree) => {
  const diffObject = getObjectFromDiffTree(diffTree);
  const formattedDiff = stringifyObject(diffObject);

  return formattedDiff;
};

export default getStylishFormat;
