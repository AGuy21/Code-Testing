import GetSponsorData from "../../utils/GetSponsorData";
import SponsorCard from "./SponsorCard";
import SectionPanel from "../ui/SectionPanel";
import VacancyCard from "./VacancyCard";
import SkeletonCard from "./SkeletonCard";
import { RocketIcon, StarIcon, GlobeIcon } from "../ui/Icons";

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
      <div className="relative py-12 px-4 rounded-3xl overflow-hidden border border-pink-500/20 bg-linear-to-b from-indigo-950/50 to-purple-900/20 backdrop-blur-sm">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent opacity-50" />

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6 shadow-[0_0_15px_rgba(236,72,153,0.2)] backdrop-blur-md">
            <RocketIcon className="w-6 h-6 text-pink-400 animate-bounce" />
            <span className="text-pink-300 font-bold tracking-wide uppercase text-sm">
              Galactic Partners
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Our Visionary Supporters
          </h2>
          <p className="text-indigo-200/80 max-w-2xl mx-auto text-lg leading-relaxed">
            These partners have gone above and beyond to fuel our mission.
            Their generous support powers our most ambitious projects and inspires the next generation.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
          {loading ? (
             <div className="w-full max-w-[350px]">
               <SkeletonCard size="lg" />
             </div>
          ) : galacticSponsors.length > 0 ? (
            galacticSponsors.map((sponsor, index) => (
              <div key={`galactic-${index}`} className="w-full max-w-[350px] transform hover:scale-105 transition-transform duration-500">
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
            <div className="w-full max-w-[350px]">
              <VacancyCard tier="Galactic" size="lg" />
            </div>
          )}
        </div>
      </div>

      {/* Stellar Tier */}
      <SectionPanel
        icon={<StarIcon className="w-6 h-6 text-amber-300" />}
        title={<span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 to-yellow-300">Stellar Partners</span>}
        subtitle={
          <span className="text-amber-300/60">Enhanced Visibility & Impact</span>
        }
        className="bg-linear-to-br from-indigo-950/30 to-amber-900/10 border-amber-500/10"
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
            <div className="col-span-full flex justify-center py-8">
              <VacancyCard tier="Stellar" size="md" />
            </div>
          )}
        </div>
      </SectionPanel>

      {/* Terrestrial Tier */}
      <SectionPanel
        icon={<GlobeIcon className="w-6 h-6 text-emerald-300" />}
        title={<span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-300 to-teal-300">Terrestrial Partners</span>}
        subtitle={
          <span className="text-emerald-300/60">Community Foundation</span>
        }
        className="bg-linear-to-br from-indigo-950/30 to-emerald-900/10 border-emerald-500/10"
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
            <div className="col-span-full flex justify-center py-8">
              <VacancyCard tier="Terrestrial" size="sm" />
            </div>
          )}
        </div>
      </SectionPanel>
    </div>
  );
}

