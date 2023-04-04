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

const getPlainFormat = (diffTree) => {
  const iter = (node, pathToCurrent) => {
    const plainFormat = node
      .map((item) => {
        const { name, type } = item;
        const pathToNext = [...pathToCurrent, name];
        const currentPath = pathToNext.join('.');

        switch (type) {
          case 'removed':
            return `Property '${currentPath}' was ${type}`;
          case 'added':
            return `Property '${currentPath}' was ${type} with value: ${handleValue(item.value)}`;
          case 'updated':
            return `Property '${currentPath}' was ${type}. From ${handleValue(item.value1)} to ${handleValue(item.value2)}`;
          case 'unchanged':
            return [];
          case 'nested':
            return iter(item.children, pathToNext);
          default:
            throw new Error(`Unknown type '${type}`);
        }
      });

    return _.flattenDeep(plainFormat).join('\n');
  };

  return iter(diffTree, []);
};

export default getPlainFormat;
