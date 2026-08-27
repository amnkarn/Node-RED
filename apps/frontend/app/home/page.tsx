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
  ChevronRight,
  Sparkles
} from "lucide-react";
import ZapTable from "@/components/home/ZapTable";

export interface Zap {
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
        //console.log(data);
        setZaps(data);

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

  useEffect(() => { //popup
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get("registered") === "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

        {/* Banner */}
        <div className="bg-linear-to-r from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
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
                <Plus className="w-4 h-4 stroke-3" />
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