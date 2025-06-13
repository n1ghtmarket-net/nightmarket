import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import type { Url } from "@shared/schema";

interface ModuleCardProps {
  module: Url;
  onCopy: () => void;
}

export function ModuleCard({ module, onCopy }: ModuleCardProps) {
  const getIconColor = (iconClass: string) => {
    if (iconClass.includes("youtube")) return "text-red-500";
    if (iconClass.includes("spotify")) return "text-green-500";
    if (iconClass.includes("soundcloud")) return "text-orange-500";
    if (iconClass.includes("heart")) return "text-pink-500";
    return "text-purple-500";
  };

  return (
    <Card className="gradient-card hover:scale-105 transition-all duration-500 transform border group cursor-pointer relative overflow-hidden backdrop-blur-xl" onClick={onCopy}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`text-4xl ${getIconColor(module.icon || "")} drop-shadow-lg`}>
            <i className={module.icon || "fas fa-puzzle-piece"}></i>
          </div>
          <div className="flex items-center gap-2">
            {module.status === "active" && (
              <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Active</span>
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold night-text mb-3 group-hover:text-purple-300 transition-colors duration-300">{module.name}</h3>
        <p className="text-sm text-slate-300 mb-6 min-h-[2.5rem] leading-relaxed">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <Button 
            size="sm" 
            className="gradient-button opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 text-white border-0 rounded-full px-4 py-2 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
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