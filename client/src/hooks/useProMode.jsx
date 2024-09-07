import { useState, useEffect } from 'react';
export const useProMode = () => {
  const [isProMode, setIsProMode] = useState(false);

  useEffect(() => {
    const storedProMode = localStorage.getItem('isProMode');
    if (storedProMode !== null) {
      setIsProMode(JSON.parse(storedProMode));
    }
  }, []);

  const toggleProMode = () => {
    const newProMode = !isProMode;
    setIsProMode(newProMode);
    localStorage.setItem('isProMode', JSON.stringify(newProMode));
  };

  return [isProMode, toggleProMode];
};