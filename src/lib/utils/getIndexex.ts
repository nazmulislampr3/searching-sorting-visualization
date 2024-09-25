const getIndexes = (arr: number[], targetArr: (number | null)[]): number[] => {
  const indexes: number[] = [];

  arr.forEach((num) => {
    const index = targetArr.findIndex((num2) => num2 === num);
    indexes.push(index);
    targetArr[index] = null;
  });

  return indexes;
};

export default getIndexes;
