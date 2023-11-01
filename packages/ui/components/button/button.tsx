import { useEffect, useState } from 'react';

const Button = () => {
  const [state] = useState(false);

  useEffect(() => {
    if (state == true) {
      console.log('false');
    }
  }, []);

  return <button>Click me!</button>;
};

export default Button;
