export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-8 mt-20">
      <div className="py-16 md:py-24">
        <div className="h-4 w-32 bg-accent animate-pulse rounded mb-4" />
        <div className="h-16 w-1/2 bg-accent animate-pulse rounded mb-6" />
        <div className="h-6 w-2/3 bg-accent animate-pulse rounded" />
      </div>
      
      <div className="flex gap-2 py-6 border-b border-border overflow-hidden">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 bg-accent animate-pulse rounded-full flex-shrink-0" />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mt-12 mb-20">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="space-y-4">
            <div className="aspect-[3/4] bg-accent animate-pulse rounded-[12px]" />
            <div className="h-4 w-2/3 bg-accent animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-accent animate-pulse rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
