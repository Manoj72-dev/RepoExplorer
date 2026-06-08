const COLORS = ["#378ADD","#1D9E75","#D85A30","#7F77DD","#BA7517","#D4537E","#639922"]

function LanguageCard({ languages }) {
    if (!languages) return null
    const entries = Object.entries(languages)
    if (entries.length === 0) 
        return(
            <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">
                <h1 className="text-white font-medium text-base mb-4">No Language chart</h1>
            </div>
        ) 

    const total = entries.reduce((a, b) => a + b[1], 0)
    const sorted = entries.sort((a, b) => b[1] - a[1])
    const max = sorted[0][1]
    return (
        <div className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700">
            <h2 className="text-white font-medium text-base mb-4">Languages</h2>
            <div className="flex flex-col gap-3">
                {sorted.map(([lang, count], i) => {
                    const pct = Math.round((count / total) * 100)
                    const barW = Math.round((count / max) * 100)
                    const color = COLORS[i % COLORS.length]
                    return (
                        <div key={lang} className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ background: color }} />
                            <span className="text-zinc-300 text-sm w-24 flex-shrink-0">{lang}</span>
                            <div className="flex-1 bg-zinc-700 rounded-full h-2 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${barW}%`, background: color }} />
                            </div>
                            <span className="text-zinc-400 text-xs w-20 text-right flex-shrink-0">
                                {count} repo{count !== 1 ? 's' : ''} · {pct}%
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LanguageCard;