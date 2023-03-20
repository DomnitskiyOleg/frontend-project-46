import _ from 'lodash';

const handleValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const handleLeaf = (leaf, pathToLeaf) => {
  let result;
  const { name, currentValue, previousValue } = leaf;
  if (currentValue === 'no value') {
    result = `Property '${pathToLeaf}${name}' was removed`;
  } else if (previousValue === 'no value') {
    result = `Property '${pathToLeaf}${name}' was added with value: ${handleValue(
      currentValue,
    )}`;
  } else if (currentValue !== previousValue) {
    result = `Property '${pathToLeaf}${name}' was updated. From ${handleValue(
      previousValue,
    )} to ${handleValue(currentValue)}`;
  } else {
    result = [];
  }
  return result;
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
  const plainFormat = _.flattenDeep(diffTree.map((item) => iter(item, ''))).join('\n');
  return plainFormat;
};

export default getPlainFormat;
