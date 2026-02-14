export default function Logo({ size = "md", showText = true }: { size?: "sm" | "md" | "lg"; showText?: boolean }) {
  const sizes = {
    sm: { container: "h-8", icon: "w-6 h-6", text: "text-lg" },
    md: { container: "h-10", icon: "w-8 h-8", text: "text-xl" },
    lg: { container: "h-12", icon: "w-10 h-10", text: "text-2xl" }
  }
  
  const s = sizes[size]
  
  return (
    <div className={`flex items-center gap-3 ${s.container}`}>
      {/* Logo Icon */}
      <div className={`${s.icon} bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg`}>
        <svg viewBox="0 0 24 24" className="w-5/6 h-5/6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-9a2 2 0 012-2h4a2 2 0 012 2v9" />
          <path d="M12 7v5M9 10h6" strokeLinecap="round" />
        </svg>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${s.text} font-bold text-slate-900 leading-tight`}>
            Flip<span className="text-amber-600">Analyzer</span>
          </span>
          <span className="text-xs text-slate-500 tracking-wider uppercase">Real Estate Investment Tool</span>
        </div>
      )}
    </div>
  )
}
