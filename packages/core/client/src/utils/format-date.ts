export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-US');
};
