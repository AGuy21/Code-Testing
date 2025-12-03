import { Colors } from "../constants/colors";
import { useRef, useEffect, useState } from "react";
import type { SponsorItem } from "../constants/types/SponsorItem";
import { formatToMMDDYYYY } from "../utils/formatDate";
import { tierStyles } from "../constants/tierStyles";

interface SponsorCardProps {
  name?: string;
  logoUrl?: string;
  website?: string;
  tier?: SponsorItem["tier"];
  date?: string;
}

export default function SponsorCard({
  name,
  logoUrl,
  website,
  tier,
  date,
}: SponsorCardProps) {
  const MMDDYYYY = formatToMMDDYYYY(date || "");
  const sStyle = tier ? tierStyles[tier] : tierStyles["default"];
  const nameRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    if (nameRef.current) {
      setOverflow(nameRef.current.scrollWidth > nameRef.current.clientWidth);
    }
  }, [name]);

  const content = (
    <div
      className="flex flex-col items-center justify-start p-6 rounded-xl border transition-transform transform hover:scale-105 cursor-pointer min-h-[140px] relative overflow-hidden animate-float"
      style={{
        borderColor: `${sStyle.border}60`,
        borderWidth: (sStyle.borderWidth ?? 1) + "px",
        background: `linear-gradient(180deg, rgba(255,255,255,0.02), transparent)`,
        boxShadow: sStyle.shadow || `0 6px 30px ${sStyle.border}40`,
      }}
    >
      {/* Tier ribbon top-left */}
      {tier && (
        <span
          className="absolute left-3 top-3 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-2"
          style={{
            background: sStyle.ribbonBg,
            color: sStyle.text,
            boxShadow: `0 4px 12px ${sStyle.border}60`,
          }}
        >
          <span className="text-sm">
            {tier === "Terrestrial" ? "🌍" : tier === "Stellar" ? "✨" : "🚀"}
          </span>
          <span className="uppercase tracking-[0.08em] text-[10px]">
            {tier ?? tier}
          </span>
        </span>
      )}

      <div className="w-full h-24 flex items-center justify-center z-10">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name || "Sponsor"}
            className="max-w-[140px] h-16 object-contain z-10 block"
            loading="lazy"
            style={{ maxHeight: 64 }}
          />
        ) : (
          <div className="text-indigo-300/50 text-sm text-center z-10">
            {name || "Sponsor Logo"}
          </div>
        )}
      </div>

      {name && (
        <div
          className="mt-4 text-sm font-semibold z-10 text-center w-full overflow-hidden"
          style={{ color: sStyle.text }}
        >
          <div ref={nameRef} className="inline-block whitespace-nowrap scroll-text" style={{ animation: overflow ? undefined : "none" }}>
            <span className="mx-2">{name}</span>
            {overflow && <span className="mx-2">{name}</span>}
          </div>
        </div>
      )}

      {MMDDYYYY && (
        <div className="mt-2 text-xs z-10" style={{ color: Colors.star }}>
          {MMDDYYYY}
        </div>
      )}

      {/* decorative gradient */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: sStyle.ribbonBg,
          filter: "blur(40px)",
          transform: "translateY(40%)",
        }}
      />
    </div>
  );

  if (website) {
    return (
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Sponsor: ${name || "site"}`}
      >
        {content}
      </a>
    );
  }

  return (
    <>
      {content}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
          100% { transform: translateY(0) }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .scroll-text {
          animation: scroll 8s linear infinite;
        }
      `}</style>
    </>
  );
}
