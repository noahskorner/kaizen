import { authService } from '@kaizen/auth-client';
import { useAuthStore } from '@kaizen/auth-client/src/use-auth-store';
import { useEffect } from 'react';

export interface GlobalLayoutProps {
  children: React.ReactNode;
}

export const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const authStore = useAuthStore();

  useEffect(() => {
    const refreshToken = async () => {
      if (authService.isAuthenticated()) {
        authStore.refreshToken();
        const response = await authService.refreshToken();
        if (response.type === 'SUCCESS') {
          authStore.login(response.data.accessToken);
        } else {
          authStore.logout();
        }
      }
    };

    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-primary h-screen w-screen bg-gray-950 text-white">
      {children}
    </div>
  );
};
