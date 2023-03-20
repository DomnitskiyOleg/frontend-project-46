import _ from 'lodash';

const isDirectory = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const getDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diffTree = keys.map((key) => {
    if (isDirectory(data1[key], data2[key])) {
      return { name: key, children: getDiffTree(data1[key], data2[key]) };
    }
    return {
      name: key,
      currentValue: _.cloneDeep(_.get(data2, key, 'no value')),
      previousValue: _.cloneDeep(_.get(data1, key, 'no value')),
    };
  });
  return diffTree;
};
export default getDiffTree;
