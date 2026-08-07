import { useState } from 'react';

export function usePlaceholder() {
  const [value, setValue] = useState('Hello from Functions');

  return {
    value,
    setValue,
  };
}
