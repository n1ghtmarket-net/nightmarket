import { MessageCircle, Youtube, Facebook, ExternalLink, Mail, Phone, MapPin, Clock, Shield, FileText, HelpCircle } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-16 bg-gradient-to-t from-slate-900 to-transparent">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                NightMarket
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nền tảng hàng đầu cung cấp các module độc quyền và dịch vụ thuê tài khoản chất lượng cao. Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho khách hàng.
              </p>
            </div>
            <div id="about" className="space-y-2">
              <h4 className="text-sm font-semibold text-purple-400 mb-3">Thông Tin Liên Hệ</h4>
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@nightmarket.vn</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>24/7 Hỗ trợ trực tuyến</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold night-text mb-6">Liên Kết Nhanh</h4>
            <div className="space-y-3">
              <Link href="/" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Trang Chủ
              </Link>
              <Link href="/modules" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Modules
              </Link>
              <a href="http://phimxuyendem.up.railway.app" target="_blank" rel="noopener noreferrer" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Web Phim
              </a>
              <a href="#about" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Giới Thiệu
              </a>
              <a href="#contact" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Liên Hệ
              </a>
              <a href="#support" className="block text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                Hỗ Trợ Khách Hàng
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold night-text mb-6">Dịch Vụ</h4>
            <div className="space-y-3">
              <div className="text-slate-400 text-sm">Thuê Apple ID Premium</div>
              <div className="text-slate-400 text-sm">Thuê Netflix Premium</div>
              <div className="text-slate-400 text-sm">Thuê Spotify Premium</div>
              <div className="text-slate-400 text-sm">Thuê YouTube Premium</div>
              <div className="text-slate-400 text-sm">Module Minecraft</div>
              <div className="text-slate-400 text-sm">Module Game Khác</div>
            </div>
          </div>

          {/* Support & Policies */}
          <div id="support">
            <h4 className="text-lg font-semibold night-text mb-6">Hỗ Trợ & Chính Sách</h4>
            <div className="space-y-3">
              <a href="#faq" className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                <HelpCircle className="w-4 h-4" />
                <span>Câu Hỏi Thường Gặp</span>
              </a>
              <a href="#terms" className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                <FileText className="w-4 h-4" />
                <span>Điều Khoản Sử Dụng</span>
              </a>
              <a href="#privacy" className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                <Shield className="w-4 h-4" />
                <span>Chính Sách Bảo Mật</span>
              </a>
              <a href="#refund" className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 text-sm transition-colors duration-300">
                <FileText className="w-4 h-4" />
                <span>Chính Sách Hoàn Tiền</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Contact Section */}
        <div className="border-t border-slate-700/50 pt-12 mb-8">
          <div id="contact" className="text-center">
            <h4 className="text-xl font-semibold night-text mb-8">Kết Nối Với Chúng Tôi</h4>
            <div className="flex justify-center space-x-8 mb-8">
              <a 
                href="https://discord.gg/WT9bUkVCTx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative"
                title="Tham gia Discord của chúng tôi"
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
                title="Tham gia nhóm Facebook"
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
                title="Theo dõi kênh YouTube"
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
                title="Tất cả liên kết"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/30 group-hover:border-green-400/50 transition-all duration-300 group-hover:scale-110">
                  <ExternalLink className="w-8 h-8 text-slate-300 group-hover:text-green-300 transition-colors" />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Bio Links</span>
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h5 className="font-medium night-text">Hỗ Trợ Trực Tuyến</h5>
                <p className="text-sm text-slate-400">24/7 qua Discord & Facebook</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h5 className="font-medium night-text">Bảo Mật Tuyệt Đối</h5>
                <p className="text-sm text-slate-400">Thông tin khách hàng được bảo vệ</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <h5 className="font-medium night-text">Phản Hồi Nhanh</h5>
                <p className="text-sm text-slate-400">Xử lý yêu cầu trong 24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm text-center md:text-left">
              &copy; 2024 NightMarket. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#terms" className="text-slate-400 hover:text-purple-400 transition-colors">
                Điều Khoản
              </a>
              <a href="#privacy" className="text-slate-400 hover:text-purple-400 transition-colors">
                Bảo Mật
              </a>
              <a href="#cookies" className="text-slate-400 hover:text-purple-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
