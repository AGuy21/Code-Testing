
interface SkeletonCardProps {
  size: "sm" | "md" | "lg";
}

export default function SkeletonCard({ size }: SkeletonCardProps) {
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
