export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto mt-20">
      <div className="space-y-4">
        <div className="h-4 w-24 bg-accent animate-pulse rounded" />
        <div className="h-12 w-1/2 bg-accent animate-pulse rounded" />
        <div className="h-6 w-2/3 bg-accent animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[4/5] bg-accent animate-pulse rounded-[12px]" />
        ))}
      </div>
    </div>
  )
}
