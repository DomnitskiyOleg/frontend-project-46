import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getDataFromFile = (pathToFile) => JSON.parse(readFileSync(path.resolve(pathToFile)));

const compareJson = (path1, path2) => {
  const data1 = getDataFromFile(path1);
  const data2 = getDataFromFile(path2);
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
export default compareJson;
