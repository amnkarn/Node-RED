import { Plus, RefreshCw, ZapIcon } from "lucide-react";
import Link from "next/link";


export default function ZapsHeader({
    onClick,
    loading
}: {
    onClick: () => void,
    loading: boolean
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <ZapIcon className="w-7 h-7 text-orange-500 fill-orange-500" />
              <span>Zaps</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View and manage all your automated workflows in one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClick}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              title="Refresh Zaps"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            
            <Link
              href="/zap/create"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all text-sm"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Zap</span>
            </Link>
          </div>
        </header>
  )
}