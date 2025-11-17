import { Colors } from "../../constants/colors";

export default function ParticleExplosion() {
  return (
    <>
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={
              {
                backgroundColor: Colors.star,
                boxShadow: `0 0 4px ${Colors.glow}`,
                left: "50%",
                top: "50%",
                animation: `particle-${i} 0.6s ease-out forwards`,
                "--angle": `${angle}deg`,
              } as React.CSSProperties
            }
          />
        );
      })}
      <style>{`
        ${[...Array(8)]
          .map((_, i) => {
            const angle = (i * 360) / 8;
            const radians = (angle * Math.PI) / 180;
            const distance = 40;
            const x = Math.cos(radians) * distance;
            const y = Math.sin(radians) * distance;
            return `
            @keyframes particle-${i} {
              0% {
                transform: translate(-50%, -50%);
                opacity: 1;
              }
              100% {
                transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
                opacity: 0;
              }
            }
          `;
          })
          .join("")}
      `}</style>
    </>
  );
}
