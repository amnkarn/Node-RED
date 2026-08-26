"use client";

import AlertPopup from "@/components/AlertPopup";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  Zap as ZapIcon,
  Plus,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  Layers,
  Sparkles
} from "lucide-react";

interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  trigger?: {
    type?: {
      name: string;
      image?: string;
    };
  };
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type?: {
      id: string;
      name: string;
      image?: string;
    };
  }[];
}

function useZaps() {
  const [loading, setLoading] = useState<boolean>(false);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    const fetchZaps = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/v1/zap`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch zaps");

        const data = await res.json();
        setZaps(Array.isArray(data) ? data : data.zaps || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchZaps();
  }, []);

  return { loading, zaps };
}

export default function Home() {
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [popupType, setPopupType] = useState<"success" | "info">("info");
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("registered") === "true") {
      setPopupType("success");
      setPopupMessage(
        "Registration successful! Welcome to your automated workspace."
      );
    } else {
      setPopupType("info");
      setPopupMessage("Hello! Welcome back.");
    }
  }, []);

  const { zaps, loading } = useZaps();

  return (
    <Sidebar>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <AlertPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setPopupMessage("")}
        />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workflow Automation Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome to Node-RED Workspace
            </h1>
            <p className="text-orange-100 text-sm leading-relaxed">
              Connect your applications, automate repetitive processes, and stream data across services without writing custom code.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/zap/create"
                className="bg-white hover:bg-orange-50 text-orange-600 font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Create New Zap</span>
              </Link>
              <Link
                href="/zaps"
                className="bg-orange-600/60 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-all text-sm border border-white/20"
              >
                View All Zaps
              </Link>
            </div>
          </div>
        </div>

        {/* Zaps Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ZapIcon className="w-5 h-5 text-orange-500 fill-orange-500" />
              <span>Recent Zaps</span>
            </h2>
            <Link
              href="/zaps"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 bg-white rounded-2xl border border-slate-200 flex justify-center">
              <Loader />
            </div>
          ) : (
            <ZapTable zaps={zaps} />
          )}
        </div>
      </div>
    </Sidebar>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
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
                    <img
                      src={triggerImg}
                      alt={triggerName}
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
                          <img
                            src={act.type.image}
                            alt={act.type.name}
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
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 truncate max-w-[240px] border border-slate-200/60">
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