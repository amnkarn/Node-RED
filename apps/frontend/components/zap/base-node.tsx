import React from "react";
import { Handle, Position } from "@xyflow/react";

interface BaseNodeProps {
  children: React.ReactNode;
  className?: string;
  hasTopHandle?: boolean;
  hasBottomHandle?: boolean;
}

export function BaseNode({
  children,
  className = "",
  hasTopHandle = true,
  hasBottomHandle = true,
}: BaseNodeProps) {
  return (
    <div
      className={`relative bg-white border border-gray-300 hover:border-gray-400 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 w-64 min-h-[100px] text-slate-900 ${className}`}
    >
      {/* Target handle on top to accept incoming lines */}
      {hasTopHandle && (
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-slate-400 hover:!bg-slate-600 !w-3 !h-3 !-top-1.5 transition-colors"
        />
      )}

      {children}

      {/* Source handle on bottom to emit outgoing lines */}
      {hasBottomHandle && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-slate-400 hover:!bg-slate-600 !w-3 !h-3 !-bottom-1.5 transition-colors"
        />
      )}
    </div>
  );
}

export function BaseNodeHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100 rounded-t-xl text-sm font-medium ${className}`}>
      {children}
    </div>
  );
}

export function BaseNodeHeaderTitle({ children }: { children: React.ReactNode }) {
  return <span className="flex-1 truncate text-slate-700 font-semibold">{children}</span>;
}

export function BaseNodeContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 text-xs text-slate-500 leading-relaxed ${className}`}>{children}</div>;
}
