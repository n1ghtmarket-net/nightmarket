import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { Link } from "wouter";

interface NavigationProps {
  onAdminClick: () => void;
}

export function Navigation({ onAdminClick }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-black/20 border-b border-purple-500/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                NightMarket
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link href="/" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10">
                Trang chủ
              </Link>
              <Link href="/rental" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10">
                Thuê dịch vụ
              </Link>
              <Link href="/modules" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center">
                Modules <span className="free-badge">FREE</span>
              </Link>
              <Link href="/idfree" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center">
                ID Free <span className="free-badge">FREE</span>
              </Link>
              <Link href="/ipa" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center">
                IPA <span className="free-badge">FREE</span>
              </Link>
              <a href="http://phimxuyendem.up.railway.app" target="_blank" rel="noopener noreferrer" className="night-text hover:text-purple-400 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center">
                Phim Xuyên Đêm (PXD) <span className="free-badge">FREE</span>
              </a>
              <Button 
                onClick={onAdminClick}
                className="gradient-button text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 border-0 shadow-lg"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="night-text hover:text-indigo-400"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden backdrop-blur-md bg-black/40 border-t border-purple-500/20">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link href="/" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10">
              Trang chủ
            </Link>
            <Link href="/rental" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10">
              Thuê dịch vụ
            </Link>
            <Link href="/modules" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center justify-between">
              Modules <span className="free-badge">FREE</span>
            </Link>
            <Link href="/idfree" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center justify-between">
              ID Free <span className="free-badge">FREE</span>
            </Link>
            <Link href="/ipa" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center justify-between">
              IPA <span className="free-badge">FREE</span>
            </Link>
            <a href="http://phimxuyendem.up.railway.app" target="_blank" rel="noopener noreferrer" className="block night-text hover:text-purple-400 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-purple-500/10 group flex items-center justify-between">
              Phim Xuyên Đêm (PXD) <span className="free-badge">FREE</span>
            </a>
            <Button 
              onClick={onAdminClick}
              className="w-full gradient-button text-white px-4 py-3 rounded-xl text-base font-medium border-0 mt-4"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
