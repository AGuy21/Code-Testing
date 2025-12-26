interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  className = "", 
  align = 'center' 
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  return (
    <div className={`${alignClass} ${className} mb-12`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wider">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#d4af37] font-mono text-xs uppercase tracking-widest">
          {subtitle}
        </p>
      )}
    </div>
  );
}
