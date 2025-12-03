import { useRef } from 'react';
import useOverflow from '../hooks/useOverflow';

interface MarqueeProps {
  text: string;
  className?: string;
}

export default function Marquee({ text, className = '' }: MarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const overflow = useOverflow(ref);

  if (!text) return null;

  return (
    <>
      <div ref={ref} className={`w-full overflow-hidden ${className}`}>
        {overflow ? (
          <div className="inline-block whitespace-nowrap marquee-name">
            <span className="mx-4">{text}</span>
            <span className="mx-4">{text}</span>
          </div>
        ) : (
          <div className="truncate">{text}</div>
        )}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-name {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </>
  );
}
