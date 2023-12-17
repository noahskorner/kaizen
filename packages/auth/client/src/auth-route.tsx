import { AuthService, useAuthStore } from '@kaizen/auth-client';
import { useEffect } from 'react';

export interface AuthRouteProps {
  children: React.ReactNode;
  onUnauthenticated: () => void;
}

export const AuthRoute = ({ children, onUnauthenticated }: AuthRouteProps) => {
  const { loading, authenticated, login, setLoading } = useAuthStore();

  useEffect(() => {
    const refreshToken = async () => {
      const response = await AuthService.refreshToken();
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
