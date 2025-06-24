
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Lock, 
  Link, 
  Settings, 
  History, 
  Plus, 
  Edit, 
  Trash2, 
  Globe, 
  Save,
  LogIn,
  Info,
  UserPlus,
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  Package
} from "lucide-react";
import type { Url, SiteSettings, AppleIdAccess } from "@shared/schema";

interface RentalService {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: string;
  contact: string;
  featured: boolean;
  gradient: string;
  status: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [urlForm, setUrlForm] = useState({ name: "", address: "", description: "" });
  const [editingUrl, setEditingUrl] = useState<Url | null>(null);
  const [editingService, setEditingService] = useState<RentalService | null>(null);
  const [appleIdForm, setAppleIdForm] = useState({ appleId: "", applePassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is already authenticated
  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Queries
  const { data: urls = [], refetch: refetchUrls } = useQuery({
    queryKey: ["/api/urls"],
    enabled: isAuthenticated,
  });

  const { data: settings, refetch: refetchSettings } = useQuery({
    queryKey: ["/api/settings"],
    enabled: isAuthenticated,
  });

  const { data: rentalServices = [], refetch: refetchRentalServices } = useQuery({
    queryKey: ["/api/rental-services"],
    enabled: isAuthenticated,
  });

  const { data: appleIdAccess = [], refetch: refetchAppleIdAccess } = useQuery({
    queryKey: ["/api/admin/apple-id-access"],
    enabled: isAuthenticated,
  });

  // Mutations
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      toast({ title: "Đăng nhập thành công", description: "Chào mừng đến trang quản trị" });
    },
    onError: () => {
      toast({ 
        title: "Đăng nhập thất bại", 
        description: "Thông tin đăng nhập không đúng. Thử: admin / nightmarket2024",
        variant: "destructive"
      });
    },
  });

  const createUrlMutation = useMutation({
    mutationFn: async (url: { name: string; address: string; description?: string }) => {
      const response = await apiRequest("POST", "/api/urls", url);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/urls"] });
      setUrlForm({ name: "", address: "", description: "" });
      toast({ title: "Tạo URL thành công" });
    },
    onError: () => {
      toast({ title: "Tạo URL thất bại", variant: "destructive" });
    },
  });

  const updateUrlMutation = useMutation({
    mutationFn: async ({ id, ...url }: { id: number; name: string; address: string; description?: string }) => {
      const response = await apiRequest("PUT", `/api/urls/${id}`, url);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/urls"] });
      setEditingUrl(null);
      toast({ title: "Cập nhật URL thành công" });
    },
    onError: () => {
      toast({ title: "Cập nhật URL thất bại", variant: "destructive" });
    },
  });

  const deleteUrlMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/urls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/urls"] });
      toast({ title: "Xóa URL thành công" });
    },
    onError: () => {
      toast({ title: "Xóa URL thất bại", variant: "destructive" });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const response = await apiRequest("PUT", "/api/settings", settings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Cập nhật cài đặt thành công" });
    },
    onError: () => {
      toast({ title: "Cập nhật cài đặt thất bại", variant: "destructive" });
    },
  });

  const updateRentalServiceMutation = useMutation({
    mutationFn: async ({ id, ...service }: RentalService) => {
      const response = await apiRequest("PUT", `/api/rental-services/${id}`, service);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rental-services"] });
      setEditingService(null);
      toast({ title: "Cập nhật dịch vụ thành công" });
    },
    onError: () => {
      toast({ title: "Cập nhật dịch vụ thất bại", variant: "destructive" });
    },
  });

  const generateAppleIdKeyMutation = useMutation({
    mutationFn: async (data: { appleId: string; applePassword: string }) => {
      const response = await apiRequest("POST", "/api/admin/apple-id-access/generate-key", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Thành công",
        description: `Key mới đã được tạo: ${data.accessKey}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/apple-id-access"] });
      setAppleIdForm({ appleId: "", applePassword: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tạo key mới",
        variant: "destructive",
      });
    },
  });

  const deleteAppleIdAccessMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/apple-id-access/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công",
        description: "Key đã được xóa",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/apple-id-access"] });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể xóa key",
        variant: "destructive",
      });
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await loginMutation.mutateAsync(loginForm);
    setIsLoading(false);
  };

  const handleCreateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlForm.name || !urlForm.address) {
      toast({ title: "Vui lòng điền đầy đủ tên và địa chỉ URL", variant: "destructive" });
      return;
    }
    await createUrlMutation.mutateAsync(urlForm);
  };

  const handleUpdateUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUrl) return;
    await updateUrlMutation.mutateAsync({
      id: editingUrl.id,
      name: editingUrl.name,
      address: editingUrl.address,
      description: editingUrl.description || "",
    });
  };

  const handleDeleteUrl = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa URL này?")) {
      await deleteUrlMutation.mutateAsync(id);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    await updateRentalServiceMutation.mutateAsync(editingService);
  };

  const handleGenerateAppleIdKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appleIdForm.appleId || !appleIdForm.applePassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin Apple ID",
        variant: "destructive",
      });
      return;
    }
    await generateAppleIdKeyMutation.mutateAsync(appleIdForm);
  };

  const handleDeleteAppleIdAccess = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa key này?")) {
      await deleteAppleIdAccessMutation.mutateAsync(id);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setLocation('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen night-bg flex items-center justify-center px-4">
        <Card className="w-full max-w-md night-primary night-border">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
            <CardTitle className="text-2xl night-text">Đăng nhập Admin</CardTitle>
            <p className="text-slate-400">Nhập thông tin đăng nhập để truy cập trang quản trị</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="night-text">Tên đăng nhập</Label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="night-secondary night-border night-text"
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              
              <div>
                <Label className="night-text">Mật khẩu</Label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="night-secondary night-border night-text"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full night-accent"
                style={{ backgroundColor: 'var(--night-accent)' }}
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Về trang chủ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen night-bg">
      {/* Header */}
      <div className="night-primary border-b night-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold night-text">Trang Quản Trị</h1>
              <span className="ml-4 text-sm text-slate-400">NightMarket Management</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/')}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Về trang chủ
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="night-border text-slate-400 hover:text-white"
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="modules" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 night-secondary">
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Quản lý Module
            </TabsTrigger>
            <TabsTrigger value="appleid" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              ID Free Keys
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Dịch vụ Rental
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Cài đặt
            </TabsTrigger>
          </TabsList>

          {/* Module Management Tab */}
          <TabsContent value="modules" className="space-y-8">
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <Link className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Quản lý Module
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New URL */}
                <div className="night-bg p-4 rounded-lg night-border border">
                  <h4 className="font-medium night-text mb-3">Thêm Module mới</h4>
                  <form onSubmit={handleCreateUrl} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400">Tên Module</Label>
                        <Input
                          type="text"
                          value={urlForm.name}
                          onChange={(e) => setUrlForm({ ...urlForm, name: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="Ví dụ: All In One"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">Link Module</Label>
                        <Input
                          type="url"
                          value={urlForm.address}
                          onChange={(e) => setUrlForm({ ...urlForm, address: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="https://example.com/module.lua"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-400">Mô tả</Label>
                      <Textarea
                        value={urlForm.description}
                        onChange={(e) => setUrlForm({ ...urlForm, description: e.target.value })}
                        className="night-secondary night-border night-text"
                        placeholder="Mô tả tính năng module"
                        rows={2}
                      />
                    </div>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm Module
                    </Button>
                  </form>
                </div>
                
                {/* URL List */}
                <div className="space-y-3">
                  <h4 className="font-medium night-text">Danh sách Module</h4>
                  <div className="space-y-2">
                    {urls.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        Chưa có module nào. Thêm module đầu tiên ở trên.
                      </div>
                    ) : (
                      urls.map((url: Url) => (
                        <div key={url.id} className="flex items-center justify-between p-3 night-bg rounded night-border border">
                          {editingUrl?.id === url.id ? (
                            <form onSubmit={handleUpdateUrl} className="flex-1 flex items-center gap-3">
                              <Globe className="w-5 h-5" style={{ color: 'var(--night-accent)' }} />
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input
                                  value={editingUrl.name}
                                  onChange={(e) => setEditingUrl({ ...editingUrl, name: e.target.value })}
                                  className="night-secondary night-border night-text text-sm"
                                  placeholder="Tên module"
                                />
                                <Input
                                  value={editingUrl.address}
                                  onChange={(e) => setEditingUrl({ ...editingUrl, address: e.target.value })}
                                  className="night-secondary night-border night-text text-sm"
                                  placeholder="Link module"
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button 
                                  type="button" 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => setEditingUrl(null)}
                                  className="night-border"
                                >
                                  Hủy
                                </Button>
                              </div>
                            </form>
                          ) : (
                            <>
                              <div className="flex-1 flex items-center gap-3">
                                <Globe className="w-5 h-5" style={{ color: 'var(--night-accent)' }} />
                                <div>
                                  <div className="night-text font-medium">{url.name}</div>
                                  <div className="text-sm text-slate-400 break-all">{url.address}</div>
                                  {url.description && (
                                    <div className="text-xs text-slate-500">{url.description}</div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => setEditingUrl(url)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleDeleteUrl(url.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apple ID Management Tab */}
          <TabsContent value="appleid" className="space-y-8">
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Quản lý ID Free Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create New Apple ID Key */}
                <div className="night-bg p-4 rounded-lg night-border border">
                  <h4 className="font-medium night-text mb-3">Tạo Key mới</h4>
                  <form onSubmit={handleGenerateAppleIdKey} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400">Apple ID</Label>
                        <Input
                          type="email"
                          value={appleIdForm.appleId}
                          onChange={(e) => setAppleIdForm({ ...appleIdForm, appleId: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="example@icloud.com"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">Mật khẩu</Label>
                        <Input
                          type="password"
                          value={appleIdForm.applePassword}
                          onChange={(e) => setAppleIdForm({ ...appleIdForm, applePassword: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="Mật khẩu Apple ID"
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={generateAppleIdKeyMutation.isPending}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {generateAppleIdKeyMutation.isPending ? "Đang tạo..." : "Tạo Key mới"}
                    </Button>
                  </form>
                </div>
                
                {/* Apple ID Keys List */}
                <div className="space-y-3">
                  <h4 className="font-medium night-text">Danh sách Keys</h4>
                  <div className="space-y-2">
                    {appleIdAccess.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        Chưa có key nào. Tạo key đầu tiên ở trên.
                      </div>
                    ) : (
                      appleIdAccess.map((access: AppleIdAccess) => (
                        <div key={access.id} className="flex items-center justify-between p-3 night-bg rounded night-border border">
                          <div className="flex-1 flex items-center gap-3">
                            <UserPlus className="w-5 h-5" style={{ color: 'var(--night-accent)' }} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-sm night-text bg-slate-800 px-2 py-1 rounded">
                                  {access.accessKey}
                                </span>
                                {access.isUsed ? (
                                  <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Đã sử dụng</span>
                                ) : (
                                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Có sẵn</span>
                                )}
                              </div>
                              <div className="text-sm text-slate-400">
                                {access.appleId} • Tạo: {new Date(access.createdAt).toLocaleDateString('vi-VN')}
                                {access.usedAt && ` • Dùng: ${new Date(access.usedAt).toLocaleDateString('vi-VN')}`}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => navigator.clipboard.writeText(access.accessKey)}
                              className="night-border text-slate-400 hover:text-white"
                              title="Sao chép key"
                            >
                              Copy
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => handleDeleteAppleIdAccess(access.id)}
                              disabled={deleteAppleIdAccessMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rental Services Tab */}
          <TabsContent value="rental" className="space-y-8">
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Quản lý Dịch vụ Rental
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium night-text">Danh sách Dịch vụ</h4>
                  <div className="space-y-4">
                    {rentalServices.map((service: RentalService) => (
                      <div key={service.id} className="p-4 night-bg rounded-lg night-border border">
                        {editingService?.id === service.id ? (
                          <form onSubmit={handleUpdateService} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-slate-400">Tên dịch vụ</Label>
                                <Input
                                  value={editingService.name}
                                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                  className="night-secondary night-border night-text"
                                />
                              </div>
                              <div>
                                <Label className="text-slate-400">Giá tiền</Label>
                                <Input
                                  value={editingService.price}
                                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                                  className="night-secondary night-border night-text"
                                  placeholder="Ví dụ: 20.000đ"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-slate-400">Mô tả</Label>
                              <Textarea
                                value={editingService.description}
                                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                className="night-secondary night-border night-text"
                                rows={3}
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={editingService.featured}
                                  onCheckedChange={(checked) => setEditingService({ ...editingService, featured: checked })}
                                />
                                <Label className="text-slate-400">Nổi bật</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Label className="text-slate-400">Trạng thái:</Label>
                                <select
                                  value={editingService.status}
                                  onChange={(e) => setEditingService({ ...editingService, status: e.target.value })}
                                  className="night-secondary night-border night-text rounded px-2 py-1"
                                >
                                  <option value="active">Hoạt động</option>
                                  <option value="inactive">Tạm dừng</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                <Save className="w-4 h-4 mr-2" />
                                Lưu thay đổi
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setEditingService(null)}
                                className="night-border"
                              >
                                Hủy
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="night-text font-semibold text-lg">{service.name}</h5>
                                <div className="flex gap-2">
                                  {service.featured && (
                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                                      Nổi bật
                                    </span>
                                  )}
                                  <span className={`px-2 py-1 text-xs rounded-full border ${
                                    service.status === 'active' 
                                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                                  }`}>
                                    {service.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                                  </span>
                                </div>
                              </div>
                              <p className="text-slate-400 text-sm mb-2">{service.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="night-text font-medium">Giá: {service.price}</span>
                                <span className="text-slate-400">Liên hệ: {service.contact}</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingService(service)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <Settings className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Cài đặt Website
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400">Tiêu đề Website</Label>
                        <Input
                          defaultValue={settings.siteTitle}
                          onBlur={(e) => updateSettingsMutation.mutate({ siteTitle: e.target.value })}
                          className="night-bg night-border night-text"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">Mô tả Website</Label>
                        <Input
                          defaultValue={settings.siteDescription}
                          onBlur={(e) => updateSettingsMutation.mutate({ siteDescription: e.target.value })}
                          className="night-bg night-border night-text"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => updateSettingsMutation.mutate({ maintenanceMode: checked })}
                      />
                      <Label className="night-text">Bật chế độ bảo trì</Label>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-slate-400">
                    Đang tải cài đặt...
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <History className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Nhật ký hoạt động
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 night-bg rounded night-border border">
                    <Info className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <div className="night-text text-sm">Truy cập trang quản trị</div>
                      <div className="text-slate-500 text-xs">Vừa xong</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 night-bg rounded night-border border">
                    <UserPlus className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <div className="night-text text-sm">Đăng nhập admin thành công</div>
                      <div className="text-slate-500 text-xs">Vài giây trước</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
