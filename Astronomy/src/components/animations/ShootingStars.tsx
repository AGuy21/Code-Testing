import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  duration: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createStar = (id: number) => ({
      id,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 1.5,
    });

    const addStar = () => {
      setStars((prev) => {
        const newId =
          prev.length > 0 ? Math.max(...prev.map((s) => s.id)) + 1 : 0;
        const newStars = [...prev.slice(-2), createStar(newId)];
        return newStars;
      });
    };

    const interval = setInterval(addStar, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 rounded-full opacity-0"
          style={{
            top: star.top,
            left: star.left,
            backgroundColor: Colors.star,
            boxShadow: `0 0 6px 2px ${Colors.glow}`,
            animation: `shooting ${star.duration}s linear`,
          }}
        >
          <div
            className="absolute w-20 h-0.5 -left-20 top-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${Colors.star}80, ${Colors.glow}40, transparent)`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes shooting {
          0% {
            transform: translate(-100px, -100px) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translate(300px, 300px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
