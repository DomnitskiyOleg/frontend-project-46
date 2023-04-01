import _ from 'lodash';

const isNested = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const getDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diffTree = keys.map((key) => {
    if (isNested(data1[key], data2[key])) {
      return { name: key, children: getDiffTree(data1[key], data2[key]), type: 'nested' };
    }
    if (!_.has(data1, key)) {
      return { name: key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { name: key, type: 'removed', value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { name: key, type: 'unchanged', value: data1[key] };
    }
    return {
      name: key, type: 'updated', value1: data1[key], value2: data2[key],
    };
  });
  return diffTree;
};
export default getDiffTree;
