import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const user = await getSession()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  // Admin uses the dashboard layout with admin sidebar links
  redirect("/dashboard")
}
