import { AccessToken } from '@kaizen/auth';
import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export interface AuthStore extends AccessToken {
  loading: boolean;
  authenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

const initialState: Omit<AuthStore, 'login' | 'logout' | 'setLoading'> = {
  loading: true,
  authenticated: false,
  id: '',
  email: ''
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  login: (accessToken: string) => {
    return set(() => {
      // Not really sure where this logic belongs yet
      const { id, email } = jwtDecode<AccessToken>(accessToken);

      return {
        loading: false,
        authenticated: true,
        id,
        email
      };
    });
  },
  logout: () => {
    return set(() => {
      return {
        ...initialState,
        loading: false
      };
    });
  },
  setLoading: () => {
    return set((store) => {
      return {
        ...store,
        loading: false
      };
    });
  }
}));
