import { RocketIcon, StarIcon, GlobeIcon } from "../ui/Icons";

interface VacancyCardProps {
  tier: string;
  size: "sm" | "md" | "lg";
}

export default function VacancyCard({ tier, size }: VacancyCardProps) {
  const sizeClasses = {
    sm: "h-[120px] max-w-[240px]",
    md: "h-[140px] max-w-[280px]",
    lg: "h-[180px] max-w-[350px]",
  };

  const tierColors = {
    Galactic: "text-pink-400 group-hover:text-pink-300",
    Stellar: "text-amber-400 group-hover:text-amber-300",
    Terrestrial: "text-emerald-400 group-hover:text-emerald-300",
  };

  const tierBorderColors = {
    Galactic: "border-pink-500/30 hover:border-pink-500/50 bg-pink-500/5 hover:bg-pink-500/10",
    Stellar: "border-amber-500/30 hover:border-amber-500/50 bg-amber-500/5 hover:bg-amber-500/10",
    Terrestrial: "border-emerald-500/30 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10",
  };

  return (
    <a
      href={`mailto:astronomy@nease.edu?subject=${tier} Sponsorship Inquiry`}
      className={`flex flex-col items-center justify-center w-full ${sizeClasses[size]} rounded-xl border-2 border-dashed transition-all cursor-pointer group ${tierBorderColors[tier as keyof typeof tierBorderColors] || tierBorderColors.Stellar}`}
    >
      <span className={`mb-2 opacity-50 group-hover:scale-110 transition-transform duration-300 ${tierColors[tier as keyof typeof tierColors] || "text-indigo-300"}`}>
        {tier === "Galactic" ? <RocketIcon className="w-8 h-8" /> : tier === "Stellar" ? <StarIcon className="w-8 h-8" /> : <GlobeIcon className="w-8 h-8" />}
      </span>
      <span className={`font-semibold text-sm ${tierColors[tier as keyof typeof tierColors] || "text-indigo-300"}`}>
        Become a {tier} Partner
      </span>
    </a>
  );
}
