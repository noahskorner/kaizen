import { useEffect } from 'react';
import { selectAuthenticated, selectLoading } from './auth.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './auth.effects';
import { AuthDispatch } from '.';

export interface AuthRouteProps {
  children: React.ReactNode;
  onUnauthenticated: () => void;
}

export const AuthRoute = ({ children, onUnauthenticated }: AuthRouteProps) => {
  const loading = useSelector(selectLoading);
  const authenticated = useSelector(selectAuthenticated);
  const dispatch = useDispatch<AuthDispatch>();

  useEffect(() => {
    dispatch(refreshToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && !authenticated) {
      onUnauthenticated();
    }
  }, [authenticated, loading, onUnauthenticated]);

  return loading ? <></> : children;
};
