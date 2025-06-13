import { Button } from "@/components/ui/button";
import { Copy, Star } from "lucide-react";
import type { Url } from "@shared/schema";

interface FeaturedModuleProps {
  module: Url;
  onCopy: () => void;
}

export function FeaturedModule({ module, onCopy }: FeaturedModuleProps) {
  const getIconColor = (iconClass: string) => {
    if (iconClass.includes("youtube")) return "text-red-500";
    if (iconClass.includes("spotify")) return "text-green-500";
    if (iconClass.includes("soundcloud")) return "text-orange-500";
    if (iconClass.includes("heart")) return "text-pink-500";
    return "text-white";
  };

  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02]"
      style={{ background: 'linear-gradient(135deg, var(--night-accent) 0%, #ec4899 100%)' }}
      onClick={onCopy}
    >
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
      
      {/* Featured badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
          <Star className="w-4 h-4" />
          Đặc biệt
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
            <i className={`${module.icon || "fas fa-rocket"} ${getIconColor(module.icon || "")}`}></i>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-white mb-2">{module.name}</h3>
          <p className="text-white/90 mb-4">{module.description}</p>
          
          {/* Features tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              Premium
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              Cập nhật thường xuyên
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              Chất lượng cao
            </span>
          </div>
        </div>
        
        {/* Action */}
        <div className="flex-shrink-0">
          <Button 
            className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-6 py-3"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}