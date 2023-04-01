import _ from 'lodash';

const stringify = (data, depth, spaceCount = 4, replacer = ' ') => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const stringEntries = Object.entries(data).map(([key, value]) => {
    const actualSpaceCount = spaceCount * depth;

    if (_.isObject(value)) {
      return `${replacer.repeat(actualSpaceCount)}${key}: ${stringify(
        value,
        depth + 1,
      )}`;
    }
    return `${replacer.repeat(actualSpaceCount)}${key}: ${value}`;
  });
  return [
    '{',
    ...stringEntries,
    `${replacer.repeat(depth * spaceCount - spaceCount)}}`,
  ].join('\n');
};

const getStylishFormat = (diffTree) => {
  const iter = (node, depth, spaceCount = 4, replacer = ' ') => {
    if (!_.isArray(node)) {
      const { name, type } = node;
      switch (node.type) {
        case 'removed':
          return `${replacer.repeat(
            spaceCount * depth - 2,
          )}- ${name}: ${stringify(
            node.value,
            depth + 1,
            spaceCount,
            replacer,
          )}`;

        case 'added':
          return `${replacer.repeat(
            spaceCount * depth - 2,
          )}+ ${name}: ${stringify(
            node.value,
            depth + 1,
            spaceCount,
            replacer,
          )}`;

        case 'unchanged':
          return `${replacer.repeat(spaceCount * depth)}${name}: ${stringify(
            node.value,
            depth + 1,
            spaceCount,
            replacer,
          )}`;

        case 'updated':
          return [
            `${replacer.repeat(spaceCount * depth - 2)}- ${name}: ${stringify(
              node.value1,
              depth + 1,
              spaceCount,
              replacer,
            )}`,
            `${replacer.repeat(spaceCount * depth - 2)}+ ${name}: ${stringify(
              node.value2,
              depth + 1,
              spaceCount,
              replacer,
            )}`,
          ].join('\n');
        default:
          throw new Error(`Unknown type '${type}`);
      }
    }
    const result = node.map((item) => {
      if (item.type === 'nested') {
        const { children } = item;
        return `${replacer.repeat(spaceCount * depth)}${item.name}: ${iter(
          children,
          depth + 1,
        )}`;
      }
      return iter(item, depth);
    });
    return [
      '{',
      ...result,
      `${replacer.repeat(depth * spaceCount - spaceCount)}}`,
    ].join('\n');
  };
  return iter(diffTree, 1);
};

export default getStylishFormat;
