import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Shield, Info, ArrowLeft, Smartphone, Clock, Package, ExternalLink } from "lucide-react";

export default function Ipa() {
  const handleDnsInstall = () => {
    window.open('https://khoindvn.io.vn/document/DNS/signed_khoindvn.mobileconfig', '_blank');
  };

  const handleMinecraftDownload = () => {
    window.open('https://drive.usercontent.google.com/download?id=1zU2OKkRmodSdE33DIwaCyuZZimKxJQF8&export=download&confirm=t&uuid=f74fd686-cc36-42b6-ae1e-6cc803482dca&at=AN8xHopZ2-Y8EPzSEm2F0wTLl1Ox%3A1751014644742', '_blank');
  };

  const handleKsignDownload = () => {
    window.open('https://tinyurl.com/yc6pjsjf', '_blank');
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen night-bg">
      {/* Header */}
      <div className="backdrop-blur-md bg-black/20 border-b border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DNS Install
                </h1>
                <p className="text-sm text-slate-400">Cài đặt cấu hình DNS cho thiết bị của bạn</p>
              </div>
            </div>
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="night-secondary night-border night-text flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Về trang chủ</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* DNS Install Section */}
          <Card className="night-primary night-border">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
              <CardTitle className="text-2xl night-text">Cài Đặt DNS</CardTitle>
              <p className="text-slate-400">
                Nhấn nút bên dưới để tải và cài đặt cấu hình DNS tự động
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleDnsInstall}
                className="w-full night-accent rounded-full text-lg py-6"
                style={{ backgroundColor: 'var(--night-accent)' }}
              >
                <Download className="w-5 h-5 mr-2" />
                DNS INSTALL
              </Button>
              
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-blue-400">
                  <strong>Lưu ý:</strong> Sau khi nhấn nút, bạn sẽ được chuyển đến trang tải xuống cấu hình DNS. 
                  Hãy làm theo hướng dẫn trên thiết bị để hoàn tất việc cài đặt.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Signing Apps Section */}
          <Card className="night-primary night-border">
            <CardHeader className="text-center">
              <Smartphone className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
              <CardTitle className="text-2xl night-text">Ứng dụng ký chứng chỉ</CardTitle>
              <p className="text-slate-400">
                Tải xuống ứng dụng để ký và cài đặt file IPA
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Esign App */}
              <div className="night-bg p-4 rounded-lg night-border border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium night-text">Esign</h4>
                      <p className="text-sm text-slate-400">Ứng dụng ký chứng chỉ phổ biến</p>
                    </div>
                  </div>
                  <Button 
                    disabled
                    className="bg-gray-600 text-gray-400 rounded-full px-6 cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Chưa có
                  </Button>
                </div>
              </div>

              {/* Ksign App */}
              <div className="night-bg p-4 rounded-lg night-border border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <div>
                      <h4 className="font-medium night-text">Ksign</h4>
                      <p className="text-sm text-slate-400">Ứng dụng ký chứng chỉ thay thế</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleKsignDownload}
                    className="night-accent rounded-full px-6"
                    style={{ backgroundColor: 'var(--night-accent)' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-blue-400">
                  <strong>Khuyến nghị:</strong> Sử dụng Ksign để ký và cài đặt file IPA. 
                  Esign hiện tại chưa có chứng chỉ mới.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* IPA Download Section */}
          <Card className="night-primary night-border">
            <CardHeader className="text-center">
              <Package className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
              <CardTitle className="text-2xl night-text">Tải App IPA</CardTitle>
              <p className="text-slate-400">
                Tải xuống các ứng dụng IPA có sẵn
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Minecraft App */}
              <div className="night-bg p-4 rounded-lg night-border border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium night-text">Minecraft</h4>
                      <p className="text-sm text-slate-400">Game xây dựng và phiêu lưu</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleMinecraftDownload}
                    className="night-accent rounded-full px-6"
                    style={{ backgroundColor: 'var(--night-accent)' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </div>
              
              <Alert className="border-green-500/20 bg-green-500/10">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-green-400">
                  <strong>Lưu ý:</strong> File IPA sẽ được tải từ Google Drive. 
                  Bạn cần có ứng dụng Esign để cài đặt file IPA này.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="night-primary night-border">
            <CardHeader>
              <CardTitle className="night-text">Hướng dẫn sử dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-slate-200 font-medium mb-2">DNS Install:</h4>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-sm font-bold">1</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Nhấn nút "DNS INSTALL" để mở trang tải xuống cấu hình
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-sm font-bold">2</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Tải xuống file .mobileconfig và cài đặt trên thiết bị iOS
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-slate-200 font-medium mb-2">Ứng dụng ký chứng chỉ:</h4>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 text-sm font-bold">K</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Sử dụng Ksign để ký và cài đặt file IPA (khuyến nghị)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-orange-400 text-sm font-bold">E</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Esign hiện tại chưa có chứng chỉ mới
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-slate-200 font-medium mb-2">Tải App IPA:</h4>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">1</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Chọn ứng dụng muốn tải và nhấn nút "Tải xuống"
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">2</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      File IPA sẽ được tải từ Google Drive về thiết bị
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-sm font-bold">3</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      Sử dụng Ksign hoặc Esign để cài đặt file IPA vào thiết bị iOS
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="night-primary night-border">
            <CardHeader>
              <CardTitle className="night-text">Thông tin bổ sung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="border-green-500/20 bg-green-500/10">
                <AlertDescription className="text-green-400">
                  <strong>Bảo mật:</strong> Cấu hình DNS này được ký số và an toàn cho thiết bị của bạn.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-yellow-500/20 bg-yellow-500/10">
                <AlertDescription className="text-yellow-400">
                  <strong>Khuyến nghị:</strong> Chỉ cài đặt cấu hình DNS từ nguồn tin cậy để đảm bảo an toàn.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
