import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import type { Url } from "@shared/schema";
import clsx from "clsx";

interface ModuleCardProps {
  module: Url;
  onCopy: () => void;
}

const ICON_COLOR_MAP: Record<string, string> = {
  youtube: "text-red-500",
  spotify: "text-green-500",
  soundcloud: "text-orange-500",
  heart: "text-pink-500",
};

function getIconColor(iconClass: string): string {
  const key = Object.keys(ICON_COLOR_MAP).find((k) => iconClass.includes(k));
  return key ? ICON_COLOR_MAP[key] : "text-purple-500";
}

export function ModuleCard({ module, onCopy }: ModuleCardProps) {
  return (
    <Card
      role="button"
      aria-label={`Module card for ${module.name}`}
      className="gradient-card hover:scale-[1.03] transition-all duration-500 transform border group cursor-pointer relative overflow-hidden backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      tabIndex={0}
      onClick={onCopy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onCopy();
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={clsx("text-4xl drop-shadow-lg", getIconColor(module.icon || ""))}
            aria-hidden="true"
          >
            <i className={module.icon || "fas fa-puzzle-piece"}></i>
          </div>

          {module.status === "active" && (
            <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Active</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold night-text mb-3 group-hover:text-purple-300 transition-colors duration-300">
          {module.name}
        </h3>

        <p className="text-sm text-slate-300 mb-6 min-h-[2.5rem] leading-relaxed">
          {module.description}
        </p>

        <div className="flex items-center justify-between">
          <Button
            size="sm"
            variant="ghost"
            className="gradient-button text-white border-0 rounded-full px-4 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            aria-label="Copy link"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>

          <span className="text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50 font-medium">
            {module.category}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
