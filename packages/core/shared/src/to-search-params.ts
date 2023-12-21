/* eslint-disable @typescript-eslint/no-explicit-any */
export const toSearchParams = (params: any) => {
  return new URLSearchParams(params).toString();
};
