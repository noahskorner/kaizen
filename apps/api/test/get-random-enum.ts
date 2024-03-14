// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRandomEnum = (enumeration: any): any => {
  const values = Object.values(enumeration);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};
