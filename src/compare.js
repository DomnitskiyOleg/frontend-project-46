import _ from 'lodash';

const compare = (data1, data2) => {
  const entriesOfresult = _.concat(
    Object.entries(_.cloneDeep(data1)),
    Object.entries(_.cloneDeep(data2)),
  );
  const diffObject = _.sortBy(entriesOfresult).reduce((acc, [key, value]) => {
    if (!Object.hasOwn(data2, key)) {
      acc[`- ${key}`] = value;
    } else if (!Object.hasOwn(data1, key)) {
      acc[`+ ${key}`] = value;
    } else if (data1[key] !== data2[key]) {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    } else {
      acc[`  ${key}`] = value;
    }
    return acc;
  }, {});

  return JSON.stringify(diffObject, null, '  ').replace(/[",]/g, '');
};
export default compare;
