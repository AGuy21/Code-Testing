import { Colors } from "../constants/colors";
import type { SponsorItem } from "../constants/types/SponsorItem";
import { formatToMMDDYYYY } from "../utils/formatDate";

interface SponsorCardProps {
  name?: string;
  logoUrl?: string;
  website?: string;
  tier?: SponsorItem['tier'];
  date?: string;
}

export default function SponsorCard({ name, logoUrl, website, tier, date }: SponsorCardProps) {
  const MMDDYYYY = formatToMMDDYYYY(date || "");

  // Tier styling
  const tierStyles = {
    Terrestrial: {
      border: Colors.terrestrial,
      ribbonBg: "linear-gradient(90deg,#8B5E3C,#C78C46)",
      text: "#fff",
    },
    Stellar: {
      border: Colors.stellar,
      ribbonBg: "linear-gradient(90deg,#60A5FA,#60A5FA)",
      text: "#fff",
    },
    Galactic: {
      border: Colors.galactic,
      ribbonBg: "linear-gradient(90deg,#D4AF37,#F5E08C)",
      text: "#000",
    },
    default: {
      border: Colors.primary,
      ribbonBg: "transparent",
      text: "#fff",
    },
  } as const;

  const sStyle = tier ? (tierStyles[tier] || tierStyles.default) : tierStyles.default;

  const content = (
    <div
      className="flex flex-col items-center justify-center p-6 rounded-xl border transition-transform transform hover:scale-105 cursor-pointer min-h-[120px] relative overflow-hidden animate-float"
      style={{
        borderColor: `${sStyle.border}60`,
        background: `linear-gradient(180deg, rgba(255,255,255,0.02), transparent)`,
        boxShadow: `0 6px 20px ${sStyle.border}40`,
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
            {tier === 'Terrestrial' ? '🌍' : tier === 'Stellar' ? '✨' : '🚀'}
          </span>
          <span className="uppercase tracking-[0.08em] text-[10px]">{tier}</span>
        </span>
      )}

      {logoUrl ? (
        <img
          src={logoUrl }
          alt={name || "Sponsor"}
          className="max-w-full max-h-16 object-contain z-10"
          loading="lazy"
        />
      ) : (
        <div className="text-indigo-300/50 text-sm text-center z-10">{name || "Sponsor Logo"}</div>
      )}

      {name && (
        <div className="mt-3 text-sm font-semibold z-10 text-indigo-100">{name}</div>
      )}

      {MMDDYYYY && (
        <div className="mt-2 text-xs text-indigo-300/70 z-10">{MMDDYYYY}</div>
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
      <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Sponsor: ${name || "site"}`}>
        {content}
      </a>
    );
  }

  return content;
}
