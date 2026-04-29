"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { login, getCurrentUser } from "@/lib/api"
import { saveToken } from "@/lib/auth"
import { GraduationCap, Loader2, AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Suspense } from "react"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await login(email, password)
      saveToken(data.access_token)

      const user = await getCurrentUser(data.access_token)
      const from = searchParams.get("from")
      const destination = from || (user.role === "admin" ? "/admin" : "/dashboard")
      
      router.push(destination)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setLoading(false)
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
                <Input 
                   id="email"
                   type="email" 
                   placeholder="name@szrcollege.edu" 
                   required 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="rounded-xl h-12 focus-visible:ring-primary font-body"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-primary font-body" htmlFor="password">Password</label>
                  <a className="text-xs font-bold text-secondary hover:underline font-body" href="#">Forgot Password?</a>
                </div>
                <Input 
                   id="password"
                   type="password" 
                   required 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="rounded-xl h-12 focus-visible:ring-primary font-body"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-xl border border-destructive/20 font-body">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl text-md font-bold shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : null}
                {loading ? "Signing in..." : "Sign In"}
              </Button>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={48} /></div>}>
      <LoginContent />
    </Suspense>
  )
}
