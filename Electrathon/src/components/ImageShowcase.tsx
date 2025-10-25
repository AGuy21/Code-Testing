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
      <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-[#d4af37]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/10">
        <div className="aspect-video overflow-hidden">
          <img
            src={image1Url}
            alt={image1Alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0">
          <p className="text-white text-sm font-medium">{image1Caption}</p>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-[#d4af37]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#d4af37]/10">
        <div className="aspect-video overflow-hidden">
          <img
            src={image2Url}
            alt={image2Alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0">
          <p className="text-white text-sm font-medium">{image2Caption}</p>
        </div>
      </div>
    </div>
  );
}
