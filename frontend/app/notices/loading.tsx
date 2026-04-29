export default function Loading() {
  return (
    <div className="min-h-screen pt-28 px-8 max-w-7xl mx-auto">
      <div className="h-4 w-32 bg-accent animate-pulse rounded mb-6" />
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
        <div className="space-y-4 w-full md:w-1/2">
          <div className="h-12 bg-accent animate-pulse rounded" />
          <div className="h-6 bg-accent animate-pulse rounded w-2/3" />
        </div>
        <div className="h-12 w-full md:w-80 bg-accent animate-pulse rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-accent animate-pulse rounded-2xl" />
          ))}
        </div>
        <div className="space-y-8">
          <div className="h-60 bg-accent animate-pulse rounded-2xl" />
          <div className="h-80 bg-accent animate-pulse rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
