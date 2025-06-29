import { Construction, Settings, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Maintenance() {
  return (
    <div className="min-h-screen night-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center px-4 relative z-10">
        {/* Icon */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
            <Construction className="w-16 h-16 text-purple-400 animate-bounce" />
          </div>
          <div className="absolute -top-4 -right-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-spin">
              <Settings className="w-4 h-4 text-yellow-900" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
          Đang bảo trì
        </h1>

        {/* Description */}
        <p className="text-xl text-slate-400 mb-8 leading-relaxed">
          Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn cho bạn.
          Vui lòng quay lại sau ít phút.
        </p>

        {/* Status Indicators */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-500/30 mb-2">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-sm text-slate-400">Tạm thời</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 mb-2">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
            <div className="text-sm text-slate-400">Nâng cấp</div>
          </div>
        </div>

        {/* Reload Button */}
        <Button 
          onClick={() => window.location.reload()}
          className="gradient-button text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 border-0 shadow-lg"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Thử lại
        </Button>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <p className="text-sm text-slate-500">
            Nếu bạn cần hỗ trợ khẩn cấp, vui lòng liên hệ qua{" "}
            <a 
              href="https://discord.gg/WT9bUkVCTx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Discord
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
