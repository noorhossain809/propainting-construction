// components/dashboard/StatCard.tsx
import { ArrowUpRight, TrendingUp } from "lucide-react"

interface StatCardProps {
    title: string
    value: number | string
    footer?: string
    footerType?: "increase" | "neutral"
    variant?: "highlight" | "default"
}

export default function StatCard({
    title,
    value,
    footer,
    footerType = "neutral",
    variant = "default",
}: StatCardProps) {
    const isHighlight = variant === "highlight"

    return (
        <div
            className={`relative rounded-2xl p-5 flex flex-col justify-between min-h-[140px] ${
                isHighlight
                    ? "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white"
                    : "bg-white text-gray-900 border border-gray-100"
            }`}
        >
            {/* Top row */}
            <div className="flex items-start justify-between">
                <span
                    className={`text-sm font-medium ${
                        isHighlight ? "text-white/90" : "text-gray-500"
                    }`}
                >
                    {title}
                </span>
                <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        isHighlight
                            ? "bg-white/15 text-white"
                            : "bg-gray-50 text-gray-400"
                    }`}
                >
                    <ArrowUpRight size={15} />
                </span>
            </div>

            {/* Value */}
            <div className="mt-4">
                <h2 className="text-4xl font-semibold tracking-tight">{value}</h2>
            </div>

            {/* Footer */}
            {footer && (
                <div
                    className={`mt-3 flex items-center gap-1.5 text-xs ${
                        footerType === "increase"
                            ? isHighlight
                                ? "text-emerald-200"
                                : "text-emerald-600"
                            : isHighlight
                            ? "text-white/70"
                            : "text-gray-400"
                    }`}
                >
                    {footerType === "increase" && (
                        <span
                            className={`flex h-4 w-4 items-center justify-center rounded ${
                                isHighlight ? "bg-white/15" : "bg-emerald-50"
                            }`}
                        >
                            <TrendingUp size={11} />
                        </span>
                    )}
                    <span>{footer}</span>
                </div>
            )}
        </div>
    )
}