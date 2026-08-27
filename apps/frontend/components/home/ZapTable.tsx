import { BACKEND_URL } from "@/app/config";
import { Zap } from "@/app/home/page";
import { ArrowRight, Check, ChevronRight, Copy, Layers, Plus, ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";



export default function ZapTable({ zaps }: { zaps: Zap[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (zaps.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 text-sm mb-4">No Zaps created yet.</p>
        <Link
          href="/zap/create"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create your first Zap</span>
        </Link>
      </div>
    );
  }

  const handleCopyWebhook = (userId: string, zapId: string) => {
    const webhookUrl = `${BACKEND_URL}/hooks/catch/${userId}/${zapId}`;
    navigator.clipboard.writeText(webhookUrl);
    setCopiedId(zapId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
        <div className="col-span-5 sm:col-span-4">Workflow Flow</div>
        <div className="col-span-4 sm:col-span-4 hidden sm:block">Webhook URL</div>
        <div className="col-span-4 sm:col-span-2 text-center">Actions</div>
        <div className="col-span-3 sm:col-span-2 text-right">Action</div>
      </div>

      {zaps.map((zap) => {
        const triggerName = zap.trigger?.type?.name || "Trigger";
        const triggerImg = zap.trigger?.type?.image;

        return (
          <div
            key={zap.id}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors"
          >
            <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <div
                  className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0"
                  title={`Trigger: ${triggerName}`}
                >
                  {triggerImg ? (
                    <Image
                      src={triggerImg}
                      alt={triggerName}
                      height={5}
                      width={5}
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <ZapIcon className="w-4 h-4 fill-orange-500 text-orange-500" />
                  )}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

                {zap.actions && zap.actions.length > 0 ? (
                  zap.actions.map((act, index) => (
                    <div key={act.id || index} className="flex items-center gap-1.5">
                      {index > 0 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      )}
                      <div
                        className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0"
                        title={`Action: ${act.type?.name || "Action"}`}
                      >
                        {act.type?.image ? (
                          <Image
                            src={act.type.image}
                            alt={act.type.name}
                            height={4}
                            width={4}
                            className="w-4 h-4 object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <Layers className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No actions</span>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-4 hidden sm:flex items-center gap-2">
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 truncate max-w-60 border border-slate-200/60">
                /hooks/catch/.../{zap.id.slice(0, 8)}
              </div>
              <button
                onClick={() => handleCopyWebhook(zap.userId, zap.id)}
                className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                title="Copy Webhook URL"
              >
                {copiedId === zap.id ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="col-span-4 sm:col-span-2 text-center">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {zap.actions?.length || 0} Actions
              </span>
            </div>

            <div className="col-span-3 sm:col-span-2 flex items-center justify-end">
              <Link
                href={`/zap/${zap.id}`}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <span>View</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}