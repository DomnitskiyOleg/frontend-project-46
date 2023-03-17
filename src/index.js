import path from 'path';
import { readFileSync } from 'fs';
import getDiffTree from './getDiffTree.js';
import parseData from './parsers.js';
import stylish from './formaters.js';

const getDataFromFile = (pathToFile) => readFileSync(path.resolve(pathToFile));
const gendiff = (pathToFile1, pathToFile2) => {
  const extension1 = path.extname(pathToFile1);
  const extension2 = path.extname(pathToFile2);
  const data1 = getDataFromFile(pathToFile1);
  const data2 = getDataFromFile(pathToFile2);
  const parsedData1 = parseData(data1, extension1);
  const parsedData2 = parseData(data2, extension2);
  const diffTree = getDiffTree(parsedData1, parsedData2);
  return stylish(diffTree);
};

export default gendiff;
