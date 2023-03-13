import _ from 'lodash';
import { readFileSync } from 'node:fs';
import path from 'node:path';


const diff = (pathToFile1, pathToFile2) => {
    
//   const data1 = JSON.parse(readFileSync(path.resolve(pathToFile1)));
//   const data2 = JSON.parse(readFileSync(path.resolve(pathToFile2)));
const data1  = path.resolve(pathToFile1)
const data2 = path.resolve(pathToFile2)
  console.log(data1, data2);
}
diff(`\\wsl$\Ubuntu\home\amdmod\frontend-project-46\file3.yml`,`C:\dddd` );