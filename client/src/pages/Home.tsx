import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AdminPanel } from "@/components/AdminPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Search, Download, Star, Rocket, Copy, ExternalLink, Zap, Shield, Clock } from "lucide-react";
import type { Url } from "@shared/schema";

export default function Home() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: modules = [] } = useQuery<Url[]>({
    queryKey: ["/api/urls"],
  });

  const filteredModules = useMemo(() => {
    if (!searchTerm) return modules;
    return modules.filter((module: Url) =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [modules, searchTerm]);

  const featuredModule = modules.find((module: Url) => module.featured);
  const regularModules = filteredModules.filter((module: Url) => !module.featured);

  const handleCopyLink = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Đã sao chép!",
      description: `Link ${name} đã được sao chép vào clipboard`,
    });
  };

  return (
    <div className="min-h-screen night-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 px-6 py-3 rounded-full mb-8 shadow-2xl">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Premium ShadowRocket Modules</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              NIGHTMARKET
            </span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-light text-purple-300">
              Modules Store
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Khám phá bộ sưu tập module premium được thiết kế đặc biệt cho 
            <span className="text-purple-400 font-medium"> ShadowRocket</span>, 
            mang đến trải nghiệm tuyệt vời nhất
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-700/50">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{modules.length}+</div>
                <div className="text-sm text-slate-400">Premium Modules</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-700/50">
              <Shield className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-slate-700/50">
              <Clock className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Download className="w-5 h-5 mr-3" />
            Khám phá Modules
          </Button>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules-section" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Premium Modules
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Chọn module phù hợp với nhu cầu của bạn. Chỉ cần click để sao chép link.
            </p>
          </div>

          {/* Enhanced Search */}
          <div className="mb-12">
            <div className="max-w-xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm module..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-0 text-white placeholder-slate-400 text-lg focus:ring-0 focus:outline-none"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Module */}
          {featuredModule && (
            <div className="mb-16">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
                
                <Card className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl border-purple-500/30 rounded-3xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]" onClick={() => handleCopyLink(featuredModule.address, featuredModule.name)}>
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-pink-600/10"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Featured badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Star className="w-4 h-4" />
                      FEATURED
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl shadow-2xl">
                          <i className={`${featuredModule.icon || "fas fa-rocket"} text-white`}></i>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{featuredModule.name}</h3>
                        <p className="text-xl text-white/80 mb-6 leading-relaxed">{featuredModule.description}</p>
                        
                        {/* Features tags */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-purple-400/30">
                            ⚡ Premium Quality
                          </span>
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-purple-400/30">
                            🔄 Auto Update
                          </span>
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-purple-400/30">
                            🛡️ Safe & Secure
                          </span>
                        </div>
                      </div>
                      
                      {/* Action */}
                      <div className="flex-shrink-0">
                        <Button 
                          className="bg-gradient-to-r from-white to-slate-100 text-purple-900 hover:from-slate-100 hover:to-white font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLink(featuredModule.address, featuredModule.name);
                          }}
                        >
                          <Copy className="w-5 h-5 mr-3" />
                          Copy Module Link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Regular Modules */}
          {regularModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularModules.map((module: Url) => {
                const getIconColor = (iconClass: string) => {
                  if (iconClass?.includes("youtube")) return "text-red-400";
                  if (iconClass?.includes("spotify")) return "text-green-400";
                  if (iconClass?.includes("soundcloud")) return "text-orange-400";
                  if (iconClass?.includes("heart")) return "text-pink-400";
                  return "text-purple-400";
                };

                return (
                  <div key={module.id} className="relative group">
                    {/* Hover glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000"></div>
                    
                    <Card 
                      className="relative bg-slate-800/60 backdrop-blur-xl border-slate-700/50 hover:border-purple-500/50 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                      onClick={() => handleCopyLink(module.address, module.name)}
                    >
                      {/* Subtle background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 via-transparent to-slate-900/20"></div>
                      
                      {/* Shine effect on hover */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      <CardContent className="relative p-6">
                        {/* Header with icon and status */}
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center text-2xl ${getIconColor(module.icon || "")} shadow-lg`}>
                            <i className={module.icon || "fas fa-puzzle-piece"}></i>
                          </div>
                          {module.status === "active" && (
                            <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-400 font-medium">ACTIVE</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                            {module.name}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed min-h-[3rem]">
                            {module.description}
                          </p>
                        </div>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyLink(module.address, module.name);
                            }}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Link
                          </Button>
                          
                          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                            {module.category}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          ) : searchTerm ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Không tìm thấy module</h3>
              <p className="text-slate-400 text-lg">Thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : null}

          {/* How to Use Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Hướng dẫn sử dụng
              </h3>
              <p className="text-slate-400 text-lg">3 bước đơn giản để cài đặt module</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Click Module",
                  description: "Chọn module bạn muốn và click để copy link",
                  icon: "🎯"
                },
                {
                  step: "02", 
                  title: "Mở ShadowRocket",
                  description: "Vào phần Config → Add Config From URL",
                  icon: "🚀"
                },
                {
                  step: "03",
                  title: "Paste & Enjoy",
                  description: "Dán link vào và bắt đầu sử dụng",
                  icon: "✨"
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  {/* Connecting line for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent z-0"></div>
                  )}
                  
                  <Card className="relative bg-slate-800/40 backdrop-blur-xl border-slate-700/50 rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 group-hover:border-purple-500/50">
                    {/* Step number */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">{item.step}</span>
                      </div>
                      {/* Decorative emoji */}
                      <div className="absolute -top-2 -right-2 text-2xl">{item.icon}</div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
}
