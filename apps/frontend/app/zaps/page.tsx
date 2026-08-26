"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import { BACKEND_URL } from "../config";
import Link from "next/link";
import {
  Plus,
  Search,
  Zap as ZapIcon,
  Play,
  Copy,
  Check,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  RefreshCw,
  Clock,
  ArrowRight,
  Filter
} from "lucide-react";

interface ActionType {
  id: string;
  name: string;
  image?: string;
}

interface TriggerType {
  id: string;
  name: string;
  image?: string;
}

interface Action {
  id: string;
  zapId: string;
  actionId: string;
  sortingOrder: number;
  metadata?: any;
  type?: ActionType;
}

interface Trigger {
  id: string;
  zapId: string;
  triggerId: string;
  metadata?: any;
  type?: TriggerType;
}

interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  trigger?: Trigger;
  actions: Action[];
}

export default function ZapsPage() {
  const [zaps, setZaps] = useState<Zap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchZaps = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BACKEND_URL}/api/v1/zap`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to load Zaps (${res.status})`);
      }

      const data = await res.json();
      setZaps(Array.isArray(data) ? data : data.zaps || []);
    } catch (err: any) {
      console.error("Error fetching zaps:", err);
      setError(err.message || "Failed to fetch Zaps");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZaps();
  }, []);

  const handleCopyWebhook = (userId: string, zapId: string) => {
    const webhookUrl = `${BACKEND_URL}/hooks/catch/${userId}/${zapId}`;
    navigator.clipboard.writeText(webhookUrl);
    setCopiedId(zapId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredZaps = zaps.filter((zap) => {
    const triggerName = zap.trigger?.type?.name?.toLowerCase() || "";
    const actionsNames = zap.actions.map((a) => a.type?.name?.toLowerCase() || "").join(" ");
    const query = searchQuery.toLowerCase();
    return (
      zap.id.toLowerCase().includes(query) ||
      triggerName.includes(query) ||
      actionsNames.includes(query)
    );
  });

  return (
    <Sidebar>
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
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
              onClick={fetchZaps}
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
        </div>

        {/* Search & Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search zaps, triggers, actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-slate-800"
            />
          </div>
          <div className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredZaps.length}</span> of{" "}
            <span className="font-bold text-slate-800">{zaps.length}</span> Zaps
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Loader />
            <p className="text-sm text-slate-500 mt-4">Loading your workflows...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
            <p className="text-sm font-semibold text-red-600">{error}</p>
            <button
              onClick={fetchZaps}
              className="mt-3 text-xs font-semibold text-red-700 underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        ) : filteredZaps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
              <ZapIcon className="w-8 h-8 fill-orange-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {searchQuery ? "No matching Zaps found" : "No Zaps created yet"}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
              {searchQuery
                ? `No Zaps match "${searchQuery}". Try a different keyword.`
                : "Create your first Zap to automate repetitive tasks between your favorite apps."}
            </p>
            {!searchQuery && (
              <Link
                href="/zap/create"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-5 rounded-xl shadow transition-all text-sm"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create a Zap</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
              <div className="col-span-5 sm:col-span-4">Workflow Flow</div>
              <div className="col-span-4 sm:col-span-4 hidden sm:block">Webhook URL</div>
              <div className="col-span-4 sm:col-span-2 text-center">Actions</div>
              <div className="col-span-3 sm:col-span-2 text-right">Details</div>
            </div>

            {/* Zap Rows */}
            {filteredZaps.map((zap) => {
              const triggerName = zap.trigger?.type?.name || "Trigger";
              const triggerImg = zap.trigger?.type?.image;

              return (
                <div
                  key={zap.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/60 transition-colors group"
                >
                  {/* Workflow Flow Column */}
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Trigger Icon */}
                      <div
                        className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0 shadow-xs"
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

                      {/* Actions Icons */}
                      {zap.actions && zap.actions.length > 0 ? (
                        zap.actions.map((act, index) => (
                          <div key={act.id || index} className="flex items-center gap-1.5">
                            {index > 0 && (
                              <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                            )}
                            <div
                              className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 shadow-xs"
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
                                <Play className="w-3.5 h-3.5 text-slate-500" />
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">No actions</span>
                      )}
                    </div>

                    <div className="hidden lg:flex flex-col ml-2 truncate">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        {triggerName} Workflow
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono truncate">
                        ID: {zap.id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>

                  {/* Webhook Copy Column */}
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

                  {/* Actions Count Column */}
                  <div className="col-span-4 sm:col-span-2 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {zap.actions?.length || 0} {zap.actions?.length === 1 ? "Action" : "Actions"}
                    </span>
                  </div>

                  {/* Details / Action Column */}
                  <div className="col-span-3 sm:col-span-2 flex items-center justify-end gap-2">
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
        )}
      </div>
    </Sidebar>
  );
}
