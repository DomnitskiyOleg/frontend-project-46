import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import compareJson from './compareJson.js';

const gendiff = (pathToFile1, pathToFile2) => {
 return compareJson(pathToFile1, pathToFile2);
};
export default gendiff;
