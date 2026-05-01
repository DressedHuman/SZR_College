"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { login, getCurrentUser } from "@/lib/api"
import { saveToken } from "@/lib/auth"
import { GraduationCap, Loader2, AlertCircle } from "lucide-react"
import { Suspense } from "react"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      console.log("Submitting login for:", email);
      const data = await login(email, password);
      console.log("Authentication successful, saving token...");
      saveToken(data.access_token);

      console.log("Fetching user profile...");
      const user = await getCurrentUser(data.access_token);
      
      const from = searchParams.get("from");
      const destination = from || (user.role === "admin" ? "/admin" : "/dashboard");
      
      console.log(`Login verified! Role: ${user.role}. Redirecting to: ${destination}`);
      
      // We use window.location.href to ensure the middleware/server-side picks up the new cookie
      window.location.href = destination;
    } catch (err: any) {
      console.error("Login process error:", err);
      setError(err.message || "Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary p-3 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="text-primary-foreground" size={32} />
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-primary tracking-tight">SZR College</h1>
          <p className="text-muted-foreground font-body">Academic Excellence Portal</p>
        </div>

        <Card className="border-border shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-heading font-bold">Welcome Back</CardTitle>
            <CardDescription className="font-body">Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary font-body" htmlFor="email">Email Address</label>
                <input 
                   id="email"
                   name="email"
                   type="email" 
                   placeholder="admin@szrcollege.edu" 
                   required 
                   className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-body"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-primary font-body" htmlFor="password">Password</label>
                  <a className="text-xs font-bold text-secondary hover:underline font-body" href="#">Forgot Password?</a>
                </div>
                <input 
                   id="password"
                   name="password"
                   type="password" 
                   required 
                   placeholder="••••••••"
                   className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-body"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-xl border border-destructive/20 font-body">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="w-full h-12 rounded-xl text-md font-bold shadow-lg hover:shadow-xl transition-all bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Signing in...
                  </>
                ) : "Sign In"}
              </button>
            </form>
          </CardContent>
          <CardFooter className="bg-accent/50 border-t border-border py-4 flex justify-center">
            <p className="text-xs text-muted-foreground font-body">
              Protected by institutional security protocols.
            </p>
          </CardFooter>
        </Card>
        
        <p className="mt-8 text-center text-sm text-muted-foreground font-body">
          Need access? <a className="text-primary font-bold hover:underline" href="#">Contact Registrar's Office</a>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
