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
      <div className="group relative overflow-hidden rounded-lg border border-white/10">
        <img
          src={image1Url}
          alt={image1Alt}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-semibold">{image1Caption}</p>
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg border border-white/10">
        <img
          src={image2Url}
          alt={image2Alt}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <p className="text-white font-semibold">{image2Caption}</p>
        </div>
      </div>
    </div>
  );
}
