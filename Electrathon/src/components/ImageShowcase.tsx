interface ImageShowcaseProps {
  image1Url: string;
  image1Alt: string;
  image1Caption: string;
  image2Url: string;
  image2Alt: string;
  image2Caption: string;
}

export default function ImageShowcase({
  image1Url,
  image1Alt,
  image1Caption,
  image2Url,
  image2Alt,
  image2Caption,
}: ImageShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group relative overflow-hidden border border-white/10 bg-black hover:border-[#d4af37] transition-all duration-300 clip-corner-br">
        <div className="aspect-video overflow-hidden relative">
          <div className="absolute inset-0 bg-[#d4af37]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <img
            src={image1Url}
            alt={image1Alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          {/* Scanline effect overlay */}
          <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
        </div>
        <div className="p-4 bg-black border-t border-white/10 flex justify-between items-center">
          <p className="text-white text-sm font-mono uppercase tracking-wider">{image1Caption}</p>
          <div className="w-2 h-2 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
        </div>
      </div>

      <div className="group relative overflow-hidden border border-white/10 bg-black hover:border-[#d4af37] transition-all duration-300 clip-corner-br md:translate-y-8">
        <div className="aspect-video overflow-hidden relative">
          <div className="absolute inset-0 bg-[#d4af37]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <img
            src={image2Url}
            alt={image2Alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          {/* Scanline effect overlay */}
          <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
        </div>
        <div className="p-4 bg-black border-t border-white/10 flex justify-between items-center">
          <p className="text-white text-sm font-mono uppercase tracking-wider">{image2Caption}</p>
          <div className="w-2 h-2 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
