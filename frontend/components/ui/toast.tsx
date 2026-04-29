"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, X } from "lucide-react"

interface Toast {
  id: number
  message: string
  type: "success" | "error"
}

interface ToastContextValue {
  showToast: (message: string, type: "success" | "error") => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside ToastProvider")
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const counter = React.useRef(0)

  const showToast = React.useCallback((message: string, type: "success" | "error") => {
    const id = ++counter.current
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const dismiss = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-sm animate-in slide-in-from-bottom-4 fade-in duration-300 font-body text-sm",
              toast.type === "success"
                ? "bg-green-50/95 border-green-200 text-green-800"
                : "bg-red-50/95 border-red-200 text-red-800"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-600 flex-shrink-0" />
            )}
            <p className="flex-1">{toast.message}</p>
            <button onClick={() => dismiss(toast.id)} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
