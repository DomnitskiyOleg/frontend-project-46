import _ from 'lodash';

const isNested = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const handleValues = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    return { type: 'added', value: _.cloneDeep(obj2[key]) };
  }
  if (!_.has(obj2, key)) {
    return { type: 'removed', value: _.cloneDeep(obj1[key]) };
  }
  if (obj1[key] === obj2[key]) {
    return { type: 'unchanged', value: _.cloneDeep(obj1[key]) };
  }
  return {
    type: 'updated',
    value1: _.cloneDeep(obj1[key]),
    value2: _.cloneDeep(obj2[key]),
  };
};

const getDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diffTree = keys.map((key) => {
    if (isNested(data1[key], data2[key])) {
      return {
        name: key,
        children: getDiffTree(data1[key], data2[key]),
        type: 'nested',
      };
    }
    return { name: key, ...handleValues(data1, data2, key) };
  });
  return diffTree;
};
export default getDiffTree;
