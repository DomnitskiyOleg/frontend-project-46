import _ from 'lodash';

const isDirectory = (value1, value2) => {
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    if (value1 === null || value2 === null) {
      return false;
    }
    return true;
  }
  return false;
};

const getDiffTree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const diffTree = keys
    .map((key) => {
      if (isDirectory(data1[key], data2[key])) {
        return { name: key, children: getDiffTree(data1[key], data2[key]) };
      }
      return {
        name: key,
        currentValue: _.cloneDeep(data2[key]),
        previousValue: _.cloneDeep(data1[key]),
      };
    });
  return diffTree;
};
export default getDiffTree;
