const handleLeaf = (leaf) => {
  const { name, currentValue, previousValue } = leaf;
  if (currentValue === 'no value') {
    return { [`- ${name}`]: previousValue };
  }
  if (previousValue === 'no value') {
    return { [`+ ${name}`]: currentValue };
  }
  if (currentValue !== previousValue) {
    return { [`- ${name}`]: previousValue, [`+ ${name}`]: currentValue };
  }
  return { [`${name}`]: currentValue };
};

const isLeaf = (node) => !Array.isArray(node);

const getObjectFromDiffTree = (node) => {
  if (isLeaf(node)) {
    return handleLeaf(node);
  }
  const result = node.reduce((acc, item) => {
    if (item.children) {
      const { name, children } = item;
      return { ...acc, [`${name}`]: getObjectFromDiffTree(children) };
    }
    return { ...acc, ...getObjectFromDiffTree(item) };
  }, {});

  return result;
};

const getStylishFormat = (diffTree) => {
  const diffObject = getObjectFromDiffTree(diffTree);
  const formattedDiff = JSON.stringify(diffObject, null, 4)
    .replace(/[",]/g, '')
    .split('\n')
    .map((item) => {
      if (item.includes('-') || item.includes('+')) {
        return item.slice(2);
      }
      return item;
    })
    .join('\n');
  return formattedDiff;
};
export default getStylishFormat;
