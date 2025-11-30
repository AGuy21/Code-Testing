import { useEffect, useState } from 'react';

export default function useOverflow(ref: React.RefObject<HTMLElement>): boolean {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const check = () => setIsOverflow(el.scrollWidth > el.clientWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [ref]);

  return isOverflow;
}
