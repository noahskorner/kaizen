export const expectValidDate = (date: string) => {
  expect(Date.parse(date)).not.toBeNaN();
};
