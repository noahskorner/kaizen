import { useDispatch } from 'react-redux';
import { ScreenDispatch } from './screen.store';
import { setScreenDimensionsAction } from './screen.actions';
import { useEffect } from 'react';

interface ScreenProviderProps {
  children: React.ReactNode;
}

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const dispatch = useDispatch<ScreenDispatch>();

  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setScreenDimensionsAction({
          width: window.innerWidth,
          height: window.innerHeight
        })
      );
    };

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return <>{children}</>;
};
