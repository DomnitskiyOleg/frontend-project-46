const handleLeaf = (leaf) => {
  const result = {};
  const { name, currentValue, previousValue } = leaf;
  if (currentValue === undefined) {
    result[`- ${name}`] = previousValue;
  } else if (previousValue === undefined) {
    result[`+ ${name}`] = currentValue;
  } else if (currentValue !== previousValue) {
    result[`- ${name}`] = previousValue;
    result[`+ ${name}`] = currentValue;
  } else {
    result[`${name}`] = currentValue;
  }
  return result;
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

const stylish = (diffTree) => {
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
export default stylish;
