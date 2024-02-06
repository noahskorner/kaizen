import {
  SetURLSearchParams,
  useSearchParams as useReactRouterSearchParams
} from 'react-router-dom';

export const useSearchParams = <T>(): [T, SetURLSearchParams] => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();

  return [Object.fromEntries(searchParams) as T, setSearchParams];
};
