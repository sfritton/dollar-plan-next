import { useState, useCallback } from 'react';

const useCounter = (initial = 0): [number, () => void] => {
  const [next, setNext] = useState(initial);

  const increment = useCallback(() => setNext(prev => prev + 1), [setNext]);

  return [next, increment];
};

export default useCounter;
