import { AccessToken } from '@kaizen/auth';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { authService } from '.';

export interface AuthStore extends AccessToken {
  loading: boolean;
  authenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  refreshToken: () => void;
}

const initialState: Omit<AuthStore, 'login' | 'logout' | 'refreshToken'> = {
  loading: true,
  authenticated: false,
  id: '',
  email: ''
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  login: (accessToken: string) => {
    return set(() => {
      const { id, email } = jwtDecode<AccessToken>(accessToken);

      return {
        loading: false,
        authenticated: true,
        id,
        email
      };
    });
  },
  logout: async () => {
    await authService.logout();
    return set(() => {
      return initialState;
    });
  },
  refreshToken: () => {
    return set(() => {
      return {
        ...initialState,
        loading: true
      };
    });
  }
}));
