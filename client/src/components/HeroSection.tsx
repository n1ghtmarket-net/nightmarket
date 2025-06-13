import { Button } from "@/components/ui/button";
import { Download, Server } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-night flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl floating-element glow-effect" style={{ backgroundColor: 'var(--night-accent)' }}></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full blur-3xl floating-element" style={{ backgroundColor: 'var(--night-accent-2)', animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full blur-2xl floating-element" style={{ backgroundColor: '#06b6d4', animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full blur-3xl floating-element" style={{ backgroundColor: '#8b5cf6', animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative text-center z-10 px-4 max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black night-text mb-4 tracking-wider leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                NIGHT
              </span>
              <span className="night-text">MARKET</span>
            </h1>
            <div className="w-32 h-1 mx-auto mb-6 gradient-button rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Your premium destination for exclusive modules and digital services
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="gradient-button px-10 py-5 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl border-0 text-white rounded-full"
          >
            <Download className="w-6 h-6 mr-3" />
            Explore Modules
          </Button>
          <Button 
            variant="outline"
            className="border-2 text-lg font-semibold px-10 py-5 transition-all duration-500 hover:scale-105 backdrop-blur-sm rounded-full"
            style={{ 
              borderColor: 'var(--night-accent)', 
              color: 'var(--night-accent)',
              backgroundColor: 'rgba(139, 92, 246, 0.1)'
            }}
          >
            <Server className="w-6 h-6 mr-3" />
            Server Status
          </Button>
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">1000+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-pink-500/20">
            <div className="text-2xl font-bold text-pink-400">50+</div>
            <div className="text-sm text-slate-400">Premium Modules</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">99.9%</div>
            <div className="text-sm text-slate-400">Uptime</div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">24/7</div>
            <div className="text-sm text-slate-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
