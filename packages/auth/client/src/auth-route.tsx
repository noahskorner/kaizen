import { useEffect } from 'react';
import { useAuthStore } from './use-auth-store';
import { AuthClient } from './auth.client';

export interface AuthRouteProps {
  children: React.ReactNode;
  onUnauthenticated: () => void;
}

export const AuthRoute = ({ children, onUnauthenticated }: AuthRouteProps) => {
  const { loading, authenticated, login, setLoading } = useAuthStore();

  useEffect(() => {
    const refreshToken = async () => {
      const response = await AuthClient.refreshToken();
      if (response.type === 'SUCCESS') {
        login(response.data.accessToken);
      }
      setLoading(false);
    };

    refreshToken();
  }, [login, setLoading]);

  useEffect(() => {
    if (!loading && !authenticated) {
      onUnauthenticated();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  return loading ? <></> : children;
};
