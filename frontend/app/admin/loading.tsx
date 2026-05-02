export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="bg-[#001e40]/20 rounded-2xl h-40" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl h-24 bg-accent" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-accent rounded-2xl h-64" />
        <div className="bg-accent rounded-2xl h-64" />
      </div>
      <div className="bg-accent rounded-2xl h-40" />
    </div>
  )
}
