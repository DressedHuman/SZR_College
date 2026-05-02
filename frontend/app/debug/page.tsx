import { getSession } from "@/lib/session"

export default async function DebugPage() {
  const user = await getSession()
  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      <pre className="bg-gray-100 p-4 rounded text-black">
        {user ? JSON.stringify(user, null, 2) : "No session found"}
      </pre>
      <div className="mt-4">
        <a href="/login" className="text-blue-600 underline">Go to Login</a>
      </div>
    </div>
  )
}
