import { REFRESH_TOKEN_COOKIE_KEY } from '../routes/auth/refresh-token-cookie-key';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRefreshToken = (response: any): string | null => {
  const refreshToken = (
    (response.header['set-cookie']?.[0]?.split(';') as string[]) ?? []
  )
    .find((x) => x.includes(REFRESH_TOKEN_COOKIE_KEY))
    ?.replace(`${REFRESH_TOKEN_COOKIE_KEY}=`, '');

  if (refreshToken == null) {
    return null;
  }

  if (refreshToken.length === 0) {
    return null;
  }

  return refreshToken;
};
