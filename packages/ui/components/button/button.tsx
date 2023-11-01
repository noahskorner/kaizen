import { useEffect } from 'react';

const Button = () => {
  const test = 'hello';

  useEffect(() => {
    console.log('Button loaded');
  });

  return <button>Click me!</button>;
};

export default Button;
