export const getRandomDate = () => {
  const start = new Date(1970, 0, 1).getTime();
  const end = Date.now();
  return new Date(start + Math.random() * (end - start));
};
