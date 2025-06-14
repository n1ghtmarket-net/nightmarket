import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { SiApple, SiNetflix, SiSpotify, SiYoutube } from "react-icons/si";

interface RentalService {
  id: string;
  name: string;
  icon: any;
  description: string;
  price: string;
  contact: string;
  featured?: boolean;
  gradient: string;
}

const rentalServices: RentalService[] = [
  {
    id: "apple-id",
    name: "Apple ID",
    icon: SiApple,
    description: "Tài khoản Apple ID có sẵn Minecraft và các ứng dụng khác",
    price: "20.000đ",
    contact: "discord",
    featured: true,
    gradient: "from-gray-900 to-black"
  },
  {
    id: "apple-id-other",
    name: "Apple ID (Apps khác)",
    icon: SiApple,
    description: "Các tài khoản Apple ID với ứng dụng khác nhau",
    price: "Liên hệ",
    contact: "discord",
    gradient: "from-blue-500 to-blue-700"
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: SiNetflix,
    description: "Tài khoản Netflix Premium với chất lượng cao",
    price: "70.000đ - 500.000đ",
    contact: "discord",
    gradient: "from-red-600 to-red-800"
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    icon: SiSpotify,
    description: "Tài khoản Spotify Premium không quảng cáo",
    price: "Liên hệ",
    contact: "discord",
    gradient: "from-green-500 to-green-700"
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    icon: SiYoutube,
    description: "Tài khoản YouTube Premium không quảng cáo",
    price: "Liên hệ",
    contact: "discord",
    gradient: "from-red-500 to-red-700"
  }
];

export default function Rental() {
  const handleContactClick = (service: RentalService) => {
    // You can customize this to open Discord or other contact methods
    window.open("https://discord.gg/WT9bUkVCTx", "_blank");
  };

  const featuredService = rentalServices.find(service => service.featured);
  const regularServices = rentalServices.filter(service => !service.featured);

  return (
    <div className="min-h-screen night-primary pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
            <div className="flex items-center space-x-2 px-4 py-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300 font-medium">Dịch vụ đang hoạt động</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 animate-fade-in">
            Dịch vụ cho thuê tài khoản
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Cho thuê các tài khoản premium với giá cả hợp lý và chất lượng tốt nhất
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold night-text">24/7</div>
              <div className="text-sm text-slate-400">Hỗ trợ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold night-text">100%</div>
              <div className="text-sm text-slate-400">Uy tín</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold night-text">5★</div>
              <div className="text-sm text-slate-400">Đánh giá</div>
            </div>
          </div>
        </div>

        {/* Featured Service */}
        {featuredService && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">⭐ Sản phẩm nổi bật</h2>
              <p className="text-slate-400">Được khách hàng yêu thích nhất</p>
            </div>
            <div className="flex justify-center">
              <Card className="night-secondary night-border border-2 border-purple-500/30 max-w-lg w-full hover:border-purple-500/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1 overflow-hidden shadow-2xl backdrop-blur-sm bg-gradient-to-br from-slate-800/90 to-slate-900/90">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
                <CardHeader className="text-center pb-6 relative">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-white to-gray-100 flex items-center justify-center mx-auto mb-6 shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                      <featuredService.icon className="w-14 h-14 text-black" />
                    </div>
                    <div className="absolute inset-0 w-24 h-24 mx-auto rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-ping"></div>
                  </div>
                  <CardTitle className="night-text text-3xl flex items-center justify-center gap-3 mb-2">
                    {featuredService.name}
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-0 px-3 py-1 font-bold animate-bounce">HOT</Badge>
                  </CardTitle>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">⭐</span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-center relative">
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">{featuredService.description}</p>
                  <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                    <div className="relative">
                      <div className="text-sm text-slate-400 mb-2">Giá ưu đãi</div>
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{featuredService.price}</span>
                      <div className="text-sm text-slate-400 mt-2">Giao hàng ngay lập tức</div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleContactClick(featuredService)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Đặt hàng ngay qua Discord
                  </Button>
                  <div className="mt-4 flex justify-center space-x-4 text-sm text-slate-400">
                    <span>✓ Bảo hành</span>
                    <span>✓ Hỗ trợ 24/7</span>
                    <span>✓ Giao hàng nhanh</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Regular Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">🎯 Dịch vụ khác</h2>
            <p className="text-slate-400">Đa dạng lựa chọn cho mọi nhu cầu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularServices.map((service, index) => {
              const getServiceBrandColor = (id: string) => {
                switch(id) {
                  case 'netflix': return 'bg-gradient-to-r from-red-600 to-red-700';
                  case 'spotify': return 'bg-gradient-to-r from-green-500 to-green-600';
                  case 'youtube': return 'bg-gradient-to-r from-red-500 to-red-600';
                  case 'apple-id-other': return 'bg-gradient-to-r from-gray-800 to-gray-900';
                  default: return 'bg-gradient-to-r from-gray-700 to-gray-800';
                }
              };

              const getServiceHoverColor = (id: string) => {
                switch(id) {
                  case 'netflix': return 'hover:border-red-500/50';
                  case 'spotify': return 'hover:border-green-500/50';
                  case 'youtube': return 'hover:border-red-500/50';
                  case 'apple-id-other': return 'hover:border-gray-500/50';
                  default: return 'hover:border-blue-500/50';
                }
              };

              const getServiceAccent = (id: string) => {
                switch(id) {
                  case 'netflix': return 'from-red-500/20 to-red-600/20';
                  case 'spotify': return 'from-green-500/20 to-green-600/20';
                  case 'youtube': return 'from-red-500/20 to-red-600/20';
                  case 'apple-id-other': return 'from-gray-500/20 to-gray-600/20';
                  default: return 'from-blue-500/20 to-blue-600/20';
                }
              };

              return (
                <Card
                  key={service.id}
                  className={`group night-secondary night-border border ${getServiceHoverColor(service.id)} hover:bg-opacity-90 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 overflow-hidden shadow-xl backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${getServiceAccent(service.id)} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <CardHeader className="pb-4 relative">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl ${getServiceBrandColor(service.id)} flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                        <service.icon className="w-9 h-9 text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="night-text text-2xl group-hover:text-white transition-colors duration-300">{service.name}</CardTitle>
                        <div className="flex space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm opacity-80">⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">{service.description}</p>
                    <div className="mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm group-hover:bg-slate-800/80 transition-colors duration-300">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">Giá từ</div>
                          <span className="text-xl font-bold night-text group-hover:text-white transition-colors duration-300">{service.price}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-500 mb-1">Trạng thái</div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-400">Sẵn có</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleContactClick(service)}
                      className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-purple-600 hover:to-pink-600 text-white border-0 py-3 rounded-xl font-semibold shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 transform group-hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Liên hệ ngay
                    </Button>
                    <div className="mt-3 flex justify-center space-x-3 text-xs text-slate-500">
                      <span>✓ Cam kết chất lượng</span>
                      <span>✓ Hỗ trợ kỹ thuật</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-16">
          <Card className="night-secondary night-border border-2 border-blue-500/30 max-w-3xl mx-auto hover:border-blue-500/60 transition-all duration-500 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-slate-800/90 to-slate-900/90 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full"></div>
            <CardHeader className="pb-6 relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">💬 Liên hệ hỗ trợ</CardTitle>
              <p className="text-slate-400">Đội ngũ chuyên nghiệp sẵn sàng phục vụ bạn</p>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm font-semibold night-text">Phản hồi nhanh</div>
                  <div className="text-xs text-slate-400">Trong vòng 5 phút</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-2xl mb-2">🛡️</div>
                  <div className="text-sm font-semibold night-text">Bảo mật cao</div>
                  <div className="text-xs text-slate-400">Thông tin an toàn</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-sm font-semibold night-text">Tư vấn miễn phí</div>
                  <div className="text-xs text-slate-400">Hỗ trợ chuyên nghiệp</div>
                </div>
              </div>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                Để biết thêm thông tin chi tiết về các dịch vụ hoặc đặt hàng, vui lòng liên hệ với chúng tôi qua Discord. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hướng dẫn bạn chọn gói dịch vụ phù hợp nhất.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => window.open("https://discord.com", "_blank")}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Kết nối Discord ngay
                  <ExternalLink className="w-5 h-5 ml-3" />
                </Button>
                <div className="flex justify-center space-x-6 text-sm text-slate-400">
                  <span>✓ Online 24/7</span>
                  <span>✓ Miễn phí tư vấn</span>
                  <span>✓ Hỗ trợ sau bán hàng</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1000+</div>
            <div className="text-sm text-slate-400 mt-1">Khách hàng hài lòng</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">99.9%</div>
            <div className="text-sm text-slate-400 mt-1">Tỷ lệ thành công</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">24/7</div>
            <div className="text-sm text-slate-400 mt-1">Hỗ trợ liên tục</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">5⭐</div>
            <div className="text-sm text-slate-400 mt-1">Đánh giá trung bình</div>
          </div>
        </div>
      </div>
    </div>
  );
}
