import { MessageCircle, Youtube, Facebook, ExternalLink } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-16 bg-gradient-to-t from-slate-900 to-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Brand section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              NightMarket
            </h3>
            <p className="text-lg text-slate-300 max-w-md mx-auto">
              Your premium destination for exclusive modules and digital services
            </p>
          </div>

          {/* Social media links */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold night-text mb-6">Connect With Us</h4>
            <div className="flex justify-center space-x-8">
              <a 
                href="https://discord.gg/WT9bUkVCTx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                title="Join our Discord"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:scale-110">
                  <SiDiscord className="w-8 h-8 text-slate-300 group-hover:text-purple-300 transition-colors" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Discord</span>
              </a>
              <a 
                href="https://facebook.com/share/g/15NA35sEvk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                title="Facebook Group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-110">
                  <Facebook className="w-8 h-8 text-slate-300 group-hover:text-blue-300 transition-colors" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
              </a>
              <a 
                href="https://youtube.com/@NightmarketServer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                title="YouTube Channel"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300 group-hover:scale-110">
                  <Youtube className="w-8 h-8 text-slate-300 group-hover:text-red-300 transition-colors" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
              </a>
              <a 
                href="https://beacons.ai/n1ghtmarket" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                title="Bio Link"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-8 h-8 text-slate-300 group-hover:text-green-300 transition-colors" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Bio</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-slate-700/50">
            <p className="text-slate-400">&copy; 2024 NightMarket. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
