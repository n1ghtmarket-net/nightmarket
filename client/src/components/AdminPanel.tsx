import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  X,
  Save,
  LogIn,
  Info,
  UserPlus
} from "lucide-react";
import type { Url, SiteSettings } from "@shared/schema";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [urlForm, setUrlForm] = useState({ 
    name: "", 
    address: "", 
    description: "", 
    icon: "", 
    category: "module", 
    featured: false, 
    status: "active" 
  });
  const [editingUrl, setEditingUrl] = useState<Url | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: urls = [], refetch: refetchUrls } = useQuery<Url[]>({
    queryKey: ["/api/urls"],
    enabled: isAuthenticated,
  });

  const { data: settings, refetch: refetchSettings } = useQuery<SiteSettings>({
    queryKey: ["/api/settings"],
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
      toast({ title: "Login successful", description: "Welcome to admin panel" });
    },
    onError: () => {
      toast({ 
        title: "Login failed", 
        description: "Invalid credentials. Try: admin / nightmarket2024",
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
      setUrlForm({ name: "", address: "", description: "", icon: "", category: "module", featured: false, status: "active" });
      toast({ title: "URL created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create URL", variant: "destructive" });
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
      toast({ title: "URL updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update URL", variant: "destructive" });
    },
  });

  const deleteUrlMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/urls/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/urls"] });
      toast({ title: "URL deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete URL", variant: "destructive" });
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const response = await apiRequest("PUT", "/api/settings", settings);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({ title: "Settings updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update settings", variant: "destructive" });
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
      toast({ title: "Please fill in both name and URL address", variant: "destructive" });
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
    if (confirm("Are you sure you want to delete this URL?")) {
      await deleteUrlMutation.mutateAsync(id);
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
    setUrlForm({ name: "", address: "", description: "", icon: "", category: "module", featured: false, status: "active" });
    setEditingUrl(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="night-primary max-w-4xl max-h-[90vh] overflow-y-auto night-border">
        <DialogHeader className="night-secondary p-6 -m-6 mb-6 border-b night-border">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle className="text-2xl font-bold night-text">Admin Panel</DialogTitle>
              <p className="text-slate-400">Manage URLs and site content</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        {!isAuthenticated ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--night-accent)' }} />
              <h3 className="text-xl font-semibold night-text">Admin Authentication</h3>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="night-text">Username</Label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="night-secondary night-border night-text"
                  placeholder="Enter admin username"
                />
              </div>
              
              <div>
                <Label className="night-text">Password</Label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="night-secondary night-border night-text"
                  placeholder="Enter admin password"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full night-accent rounded-full"
                style={{ backgroundColor: 'var(--night-accent)' }}
                disabled={isLoading}
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? "Logging in..." : "Login to Admin Panel"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-8">
            {/* URL Management */}
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <Link className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  URL Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New URL */}
                <div className="night-bg p-4 rounded-lg night-border border">
                  <h4 className="font-medium night-text mb-3">Add New URL</h4>
                  <form onSubmit={handleCreateUrl} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400">URL Name</Label>
                        <Input
                          type="text"
                          value={urlForm.name}
                          onChange={(e) => setUrlForm({ ...urlForm, name: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="e.g., Main Server"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">URL Address</Label>
                        <Input
                          type="url"
                          value={urlForm.address}
                          onChange={(e) => setUrlForm({ ...urlForm, address: e.target.value })}
                          className="night-secondary night-border night-text"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-400">Description</Label>
                      <Textarea
                        value={urlForm.description}
                        onChange={(e) => setUrlForm({ ...urlForm, description: e.target.value })}
                        className="night-secondary night-border night-text"
                        placeholder="Optional description"
                        rows={2}
                      />
                    </div>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 rounded-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add URL
                    </Button>
                  </form>
                </div>
                
                {/* URL List */}
                <div className="space-y-3">
                  <h4 className="font-medium night-text">Current URLs</h4>
                  <div className="space-y-2">
                    {urls.map((url: Url) => (
                      <div key={url.id} className="flex items-center justify-between p-3 night-bg rounded night-border border">
                        {editingUrl?.id === url.id ? (
                          <form onSubmit={handleUpdateUrl} className="flex-1 flex items-center gap-3">
                            <Globe className="w-5 h-5" style={{ color: 'var(--night-accent)' }} />
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <Input
                                value={editingUrl.name}
                                onChange={(e) => setEditingUrl({ ...editingUrl, name: e.target.value })}
                                className="night-secondary night-border night-text text-sm"
                              />
                              <Input
                                value={editingUrl.address}
                                onChange={(e) => setEditingUrl({ ...editingUrl, address: e.target.value })}
                                className="night-secondary night-border night-text text-sm"
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 rounded-full">
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button 
                                type="button" 
                                size="sm" 
                                variant="outline" 
                                className="rounded-full"
                                onClick={() => setEditingUrl(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <div className="flex-1 flex items-center gap-3">
                              <Globe className="w-5 h-5" style={{ color: 'var(--night-accent)' }} />
                              <div>
                                <div className="night-text font-medium">{url.name}</div>
                                <div className="text-sm text-slate-400">{url.address}</div>
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
                                className="text-blue-400 hover:text-blue-300 rounded-full"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleDeleteUrl(url.id)}
                                className="text-red-400 hover:text-red-300 rounded-full"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Site Settings */}
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <Settings className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Site Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-400">Site Title</Label>
                        <Input
                          defaultValue={settings.siteTitle}
                          onBlur={(e) => updateSettingsMutation.mutate({ siteTitle: e.target.value })}
                          className="night-bg night-border night-text"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400">Site Description</Label>
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
                      <Label className="night-text">Enable maintenance mode</Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="night-secondary night-border">
              <CardHeader>
                <CardTitle className="night-text flex items-center">
                  <History className="w-5 h-5 mr-2" style={{ color: 'var(--night-accent)' }} />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 night-bg rounded night-border border">
                    <Info className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <div className="night-text text-sm">Admin panel accessed</div>
                      <div className="text-slate-500 text-xs">Just now</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 night-bg rounded night-border border">
                    <UserPlus className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <div className="night-text text-sm">Admin login successful</div>
                      <div className="text-slate-500 text-xs">A few seconds ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
