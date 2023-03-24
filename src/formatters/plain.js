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
  const {
    name, type, value, value1, value2,
  } = leaf;

  if (type === 'removed') {
    return `Property '${pathToLeaf}${name}' was ${type}`;
  }
  if (type === 'added') {
    return `Property '${pathToLeaf}${name}' was ${type} with value: ${handleValue(
      value,
    )}`;
  }
  if (type === 'updated') {
    return `Property '${pathToLeaf}${name}' was ${type}. From ${handleValue(
      value1,
    )} to ${handleValue(value2)}`;
  }
  return [];
};

const getPlainFormat = (diffTree) => {
  const iter = (node, pathToCurrent) => {
    if (!node.children) {
      return handleLeaf(node, pathToCurrent);
    }
    const pathToNext = `${pathToCurrent}${node.name}.`;
    const result = node.children.map((child) => iter(child, pathToNext));
    return result;
  };
  const plainFormat = _.flattenDeep(
    diffTree.map((item) => iter(item, '')),
  ).join('\n');
  return plainFormat;
};

export default getPlainFormat;
