import yaml from 'js-yaml';

const parseData = (data, format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};
export default parseData;
