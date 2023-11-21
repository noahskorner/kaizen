import { AccessToken } from '@kaizen/auth';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export interface AuthStore extends AccessToken {
  isLoggedIn: boolean;
  login: (accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  id: '',
  email: '',
  login: async (accessToken: string) => {
    return set(() => {
      const { id, email } = jwtDecode<AccessToken>(accessToken);

      return {
        isLoggedIn: true,
        id,
        email
      };
    });
  },
  logout: async () => {
    return set(() => {
      return {
        isLoggedIn: false,
        id: '',
        email: ''
      };
    });
  }
}));
