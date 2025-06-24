import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Apple, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AppleIdCredentials {
  appleId: string;
  applePassword: string;
}

export default function IdFree() {
  const [accessKey, setAccessKey] = useState("");
  const [credentials, setCredentials] = useState<AppleIdCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) {
      setError("Vui lòng nhập key truy cập");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const response = await apiRequest("POST", "/api/apple-id/verify-key", { accessKey: accessKey.trim() });
      const data = await response.json();

      if (data.success) {
        setCredentials({
          appleId: data.data.appleId,
          applePassword: data.data.applePassword
        });
        toast({
          title: "Thành công",
          description: "Key hợp lệ! Thông tin Apple ID đã được hiển thị.",
        });
      } else {
        setError(data.message || "Key không hợp lệ hoặc đã hết hạn");
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: "Đã sao chép",
        description: `${field} đã được sao chép vào clipboard`,
      });
      
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép, vui lòng copy thủ công",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setAccessKey("");
    setCredentials(null);
    setError("");
    setCopiedField(null);
  };

  return (
    <div className="min-h-screen night-bg">
      {/* Header */}
      <div className="backdrop-blur-md bg-black/20 border-b border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Apple className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ID Free
                </h1>
                <p className="text-sm text-slate-400">Lấy Apple ID miễn phí với key từ admin</p>
              </div>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="night-secondary night-border night-text"
            >
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {/* Key Input Section */}
          {!credentials && (
            <Card className="night-primary night-border">
              <CardHeader className="text-center">
                <Key className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
                <CardTitle className="text-2xl night-text">Nhập Key Truy Cập</CardTitle>
                <p className="text-slate-400">
                  Nhập key do admin cung cấp để lấy thông tin Apple ID miễn phí
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="night-text">Key truy cập</Label>
                    <Input
                      type="text"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="night-secondary night-border night-text"
                      placeholder="Nhập key do admin cung cấp..."
                      disabled={isLoading}
                    />
                  </div>
                  
                  {error && (
                    <Alert className="border-red-500/20 bg-red-500/10">
                      <AlertDescription className="text-red-400">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full night-accent rounded-full"
                    style={{ backgroundColor: 'var(--night-accent)' }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xác thực..." : "Xác thực key"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Credentials Display Section */}
          {credentials && (
            <Card className="night-primary night-border">
              <CardHeader className="text-center">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <CardTitle className="text-2xl night-text">Thông Tin Apple ID</CardTitle>
                <p className="text-slate-400">
                  Thông tin Apple ID của bạn đã sẵn sàng
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="night-text">Tài khoản ID Apple</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={credentials.appleId}
                      readOnly
                      className="night-secondary night-border night-text"
                    />
                    <Button
                      onClick={() => handleCopy(credentials.appleId, "Apple ID")}
                      className="night-accent px-3"
                      style={{ backgroundColor: 'var(--night-accent)' }}
                    >
                      {copiedField === "Apple ID" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="night-text">Mật khẩu ID Apple</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={credentials.applePassword}
                      readOnly
                      className="night-secondary night-border night-text"
                    />
                    <Button
                      onClick={() => handleCopy(credentials.applePassword, "Mật khẩu")}
                      className="night-accent px-3"
                      style={{ backgroundColor: 'var(--night-accent)' }}
                    >
                      {copiedField === "Mật khẩu" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Alert className="border-green-500/20 bg-green-500/10">
                  <AlertDescription className="text-green-400">
                    <strong>Lưu ý:</strong> Vui lòng lưu trữ thông tin này cẩn thận. 
                    Không chia sẻ với người khác để tránh mất tài khoản.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="w-full night-secondary night-border night-text"
                >
                  Nhập key khác
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card className="night-primary night-border">
            <CardHeader>
              <CardTitle className="night-text">Hướng dẫn sử dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm font-bold">1</span>
                </div>
                <p className="text-slate-300">
                  Liên hệ admin qua Discord để nhận key truy cập miễn phí
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm font-bold">2</span>
                </div>
                <p className="text-slate-300">
                  Nhập key vào form trên để xác thực và nhận thông tin Apple ID
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm font-bold">3</span>
                </div>
                <p className="text-slate-300">
                  Sao chép thông tin Apple ID và mật khẩu để sử dụng
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm font-bold">4</span>
                </div>
                <p className="text-slate-300">
                  Không chia sẻ thông tin với người khác để bảo vệ tài khoản
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}