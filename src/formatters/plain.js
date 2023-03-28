import _ from 'lodash';

const handleValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const handleLeaf = (leaf, pathToLeaf) => {
  const { name, type } = leaf;
  const currentPath = [...pathToLeaf, name].join('.');

  switch (type) {
    case 'removed':
      return `Property '${currentPath}' was ${type}`;
    case 'added':
      return `Property '${currentPath}' was ${type} with value: ${handleValue(
        leaf.value,
      )}`;
    case 'updated':
      return `Property '${currentPath}' was ${type}. From ${handleValue(
        leaf.value1,
      )} to ${handleValue(leaf.value2)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown type '${type}`);
  }
};

const getPlainFormat = (diffTree) => {
  const iter = (node, pathToCurrent) => {
    if (!node.children) {
      return handleLeaf(node, pathToCurrent);
    }
    const pathToNext = [...pathToCurrent, node.name];
    const result = node.children.map((child) => iter(child, pathToNext));
    return result;
  };
  const plainFormat = _.flattenDeep(
    diffTree.map((item) => iter(item, [])),
  ).join('\n');
  return plainFormat;
};

export default getPlainFormat;
