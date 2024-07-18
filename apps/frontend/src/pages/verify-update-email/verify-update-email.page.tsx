import { VerifyUpdateEmailClient } from '@kaizen/user-client';
import { AuthDispatch, refreshToken } from '@kaizen/auth-client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../routes';
import {
  CreateToastRequest,
  ToastDispatch,
  createToast
} from '@kaizen/core-client';

export const VerifyUpdateEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AuthDispatch & ToastDispatch>();

  useEffect(() => {
    const verifyUpdateEmail = async () => {
      const token = new URLSearchParams(location.search).get('token');
      if (token === null) {
        throw new Error('// TODO: Throw a toast or redirect');
      }
      const response = await VerifyUpdateEmailClient.verify({
        token: token
      });
      if (response.type === 'FAILURE') {
        throw new Error('// TODO: Throw a toast or redirect');
      }

      dispatch(refreshToken());
      dispatch(
        createToast({
          title: `Email successfully updated to ${response.data.email}🎉`
        } satisfies CreateToastRequest)
      );
      navigate(paths.settings);
    };

    verifyUpdateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Redirecting...</div>;
};
