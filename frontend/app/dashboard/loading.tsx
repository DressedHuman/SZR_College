export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Banner skeleton */}
      <div className="bg-[#001e40]/20 rounded-2xl h-40" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl h-24 bg-accent" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-accent rounded-2xl h-72" />
        <div className="bg-accent rounded-2xl h-72" />
      </div>

      {/* Table skeleton */}
      <div className="bg-accent rounded-2xl h-48" />
    </div>
  )
}
