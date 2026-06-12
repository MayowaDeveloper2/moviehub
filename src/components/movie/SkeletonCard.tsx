interface SkeletonCardProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function SkeletonCard({ size = 'md' }: SkeletonCardProps) {
  const sizeClasses = { sm: 'w-[130px]', md: 'w-[155px]', lg: 'w-[175px]' };
  const imgHeights = { sm: 'h-[195px]', md: 'h-[225px]', lg: 'h-[260px]' };

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0`}>
      <div className={`${imgHeights[size]} rounded-xl bg-gray-200 animate-pulse`} />
      <div className="mt-2 space-y-1.5 px-0.5">
        <div className="h-3.5 bg-gray-200 rounded animate-pulse w-4/5" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}
