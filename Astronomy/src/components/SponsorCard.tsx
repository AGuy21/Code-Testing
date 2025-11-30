import { Colors } from "../constants/colors";

interface SponsorCardProps {
  name?: string;
  logoUrl?: string;
  website?: string;
}

export default function SponsorCard({ name, logoUrl, website }: SponsorCardProps) {
  const content = (
    <div 
      className="flex items-center justify-center p-6 rounded-lg border transition-all hover:scale-105 cursor-pointer min-h-[100px]"
      style={{ 
        borderColor: `${Colors.primary}30`,
        backgroundColor: Colors.whiteOverlay,
      }}
    >
      {logoUrl ? (
        <img src={logoUrl} alt={name || "Sponsor"} className="max-w-full max-h-16 object-contain" />
      ) : (
        <p className="text-indigo-300/50 text-sm text-center">
          {name || "Sponsor Logo"}
        </p>
      )}
    </div>
  );

  if (website) {
    return (
      <a href={website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
