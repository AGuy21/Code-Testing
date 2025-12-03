import { Colors } from "../../constants/colors";
import { useRef, useEffect, useState } from "react";
import type { SponsorItem } from "../../constants/types/SponsorItem";
import { formatToMMDDYYYY } from "../../utils/formatDate";
import { tierStyles } from "../../constants/tierStyles";
import { GlobeIcon, StarIcon, RocketIcon } from "../ui/Icons";

interface SponsorCardProps {
  name?: string;
  logoUrl?: string;
  website?: string;
  tier?: SponsorItem["tier"];
  date?: string;
  size?: "sm" | "md" | "lg";
}

export default function SponsorCard({
  name,
  logoUrl,
  website,
  tier,
  date,
  size = "md",
}: SponsorCardProps) {
  const MMDDYYYY = formatToMMDDYYYY(date || "");
  const sStyle = tier ? tierStyles[tier] : tierStyles["default"];
  const nameRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  // Size-based styles
  const sizeConfig = {
    sm: {
      padding: "p-4",
      logoHeight: "h-12",
      logoMaxW: "max-w-[100px]",
      textSize: "text-xs",
      minHeight: "min-h-[120px]",
      ribbonSize: "text-[9px]",
      ribbonIcon: "w-3 h-3",
    },
    md: {
      padding: "p-6",
      logoHeight: "h-16",
      logoMaxW: "max-w-[140px]",
      textSize: "text-sm",
      minHeight: "min-h-[140px]",
      ribbonSize: "text-[10px]",
      ribbonIcon: "w-4 h-4",
    },
    lg: {
      padding: "p-8",
      logoHeight: "h-24",
      logoMaxW: "max-w-[200px]",
      textSize: "text-lg",
      minHeight: "min-h-[180px]",
      ribbonSize: "text-xs",
      ribbonIcon: "w-5 h-5",
    },
  };

  const currentSize = sizeConfig[size];

  useEffect(() => {
    if (nameRef.current) {
      setOverflow(nameRef.current.scrollWidth > nameRef.current.clientWidth);
    }
  }, [name, size]);

  const content = (
    <div
      className={`flex flex-col items-center justify-start ${currentSize.padding} rounded-xl border transition-transform transform hover:scale-105 cursor-pointer ${currentSize.minHeight} relative overflow-hidden animate-float`}
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
          className="absolute left-3 top-3 px-2 py-1 rounded-full font-semibold flex items-center gap-2"
          style={{
            background: sStyle.ribbonBg,
            color: sStyle.text,
            boxShadow: `0 4px 12px ${sStyle.border}60`,
          }}
        >
          <span className={currentSize.ribbonIcon}>
            {tier === "Terrestrial" ? <GlobeIcon className="w-full h-full" /> : tier === "Stellar" ? <StarIcon className="w-full h-full" /> : <RocketIcon className="w-full h-full" />}
          </span>
          <span
            className={`uppercase tracking-[0.08em] ${currentSize.ribbonSize}`}
          >
            {tier ?? tier}
          </span>
        </span>
      )}

      <div className={`w-full flex items-center justify-center z-10 mb-2 mt-4`}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name || "Sponsor"}
            className={`${currentSize.logoMaxW} ${currentSize.logoHeight} object-contain z-10 block`}
            loading="lazy"
          />
        ) : (
          <div className="text-indigo-300/50 text-sm text-center z-10 py-4">
            {name || "Sponsor Logo"}
          </div>
        )}
      </div>

      {name && (
        <div
          className={`mt-auto ${currentSize.textSize} font-semibold z-10 text-center w-full overflow-hidden`}
          style={{ color: sStyle.text }}
        >
          <div
            ref={nameRef}
            className="inline-block whitespace-nowrap animate-scroll-text"
            style={{ animation: overflow ? undefined : "none" }}
          >
            <span className="mx-2">{name}</span>
            {overflow && <span className="mx-2">{name}</span>}
          </div>
        </div>
      )}

      {MMDDYYYY && (
        <div
          className="mt-1 text-xs z-10 opacity-80"
          style={{ color: Colors.star }}
        >
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

  return (
    <>
      {website ? (
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Sponsor: ${name || "site"}`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </>
  );
}

