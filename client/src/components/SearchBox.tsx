import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = "Tìm kiếm module..." }: SearchBoxProps) {
  return (
    <div className="relative max-w-2xl mx-auto group">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors duration-300" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 pr-12 py-4 text-lg gradient-card night-border night-text placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 rounded-2xl backdrop-blur-sm transition-all duration-300 border-purple-500/20"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 p-2 rounded-full transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
}