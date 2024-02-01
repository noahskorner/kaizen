export const isArrayEqual = (
  arr1: Array<string | number>,
  arr2: Array<string | number>
): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArray1 = arr1.sort();
  const sortedArray2 = arr2.sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
};
