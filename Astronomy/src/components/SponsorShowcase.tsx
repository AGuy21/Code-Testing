import GetSponsorData from "../utils/GetSponsorData";
import SponsorCard from "./SponsorCard";
import SectionPanel from "./SectionPanel";

function VacancyCard({ tier, size }: { tier: string; size: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-[120px] max-w-[240px]",
    md: "h-[140px] max-w-[280px]",
    lg: "h-[180px] max-w-[350px]",
  };

  return (
    <a
      href={`mailto:astronomy@nease.edu?subject=${tier} Sponsorship Inquiry`}
      className={`flex flex-col items-center justify-center w-full ${sizeClasses[size]} rounded-xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all cursor-pointer group`}
    >
      <span className="text-2xl mb-2 opacity-50 group-hover:scale-110 transition-transform duration-300">
        {tier === "Galactic" ? "🚀" : tier === "Stellar" ? "✨" : "🌍"}
      </span>
      <span className="text-indigo-300 font-semibold text-sm">
        Become a {tier} Partner
      </span>
    </a>
  );
}

function SkeletonCard({ size }: { size: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-[120px] max-w-[240px]",
    md: "h-[140px] max-w-[280px]",
    lg: "h-[180px] max-w-[350px]",
  };

  return (
    <div className={`w-full ${sizeClasses[size]} rounded-xl bg-indigo-900/20 animate-pulse border border-indigo-500/10 flex flex-col items-center justify-center p-6`}>
      <div className="w-16 h-16 rounded-full bg-indigo-500/20 mb-4" />
      <div className="w-3/4 h-4 rounded bg-indigo-500/20" />
    </div>
  );
}

export default function SponsorShowcase() {
  const { sponsors: sponsorData, loading } = GetSponsorData();

  // Organize sponsors by tier
  const galacticSponsors = sponsorData.filter((s) => s.tier === "Galactic");
  const stellarSponsors = sponsorData.filter((s) => s.tier === "Stellar");
  const terrestrialSponsors = sponsorData.filter(
    (s) => s.tier === "Terrestrial"
  );

  return (
    <div className="w-full flex flex-col gap-16">
      {/* Galactic Tier - Hero Section */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-pink-500/10 blur-[100px] rounded-full -z-10" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="text-pink-300 font-bold tracking-wide uppercase text-sm">
              Galactic Partners
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Visionary Supporters
          </h2>
          <p className="text-indigo-200/70 max-w-2xl mx-auto">
            These partners have gone above and beyond to fuel our mission.
            Their generous support powers our most ambitious projects.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {loading ? (
             <div className="w-full max-w-[350px]">
               <SkeletonCard size="lg" />
             </div>
          ) : galacticSponsors.length > 0 ? (
            galacticSponsors.map((sponsor, index) => (
              <div key={`galactic-${index}`} className="w-full max-w-[350px]">
                <SponsorCard
                  name={sponsor.name}
                  logoUrl={sponsor.image}
                  website={sponsor.link}
                  tier={sponsor.tier}
                  date={sponsor.date}
                  size="lg"
                />
              </div>
            ))
          ) : (
            <VacancyCard tier="Galactic" size="lg" />
          )}
        </div>
      </div>

      {/* Stellar Tier */}
      <SectionPanel
        icon="✨"
        title={<span className="text-blue-300">Stellar Partners</span>}
        subtitle={
          <span className="text-blue-300/60">Enhanced Visibility & Impact</span>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <>
              <SkeletonCard size="md" />
              <SkeletonCard size="md" />
              <SkeletonCard size="md" />
            </>
          ) : stellarSponsors.length > 0 ? (
            stellarSponsors.map((sponsor, index) => (
              <div key={`stellar-${index}`} className="w-full">
                <SponsorCard
                  name={sponsor.name}
                  logoUrl={sponsor.image}
                  website={sponsor.link}
                  tier={sponsor.tier}
                  date={sponsor.date}
                  size="md"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <VacancyCard tier="Stellar" size="md" />
            </div>
          )}
        </div>
      </SectionPanel>

      {/* Terrestrial Tier */}
      <SectionPanel
        icon="🌍"
        title={<span className="text-amber-300">Terrestrial Partners</span>}
        subtitle={
          <span className="text-amber-300/60">Entry-level Partnership</span>
        }
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <>
              <SkeletonCard size="sm" />
              <SkeletonCard size="sm" />
              <SkeletonCard size="sm" />
              <SkeletonCard size="sm" />
            </>
          ) : terrestrialSponsors.length > 0 ? (
            terrestrialSponsors.map((sponsor, index) => (
              <div key={`terrestrial-${index}`} className="w-full">
                <SponsorCard
                  name={sponsor.name}
                  logoUrl={sponsor.image}
                  website={sponsor.link}
                  tier={sponsor.tier}
                  date={sponsor.date}
                  size="sm"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <VacancyCard tier="Terrestrial" size="sm" />
            </div>
          )}
        </div>
      </SectionPanel>
    </div>
  );
}
