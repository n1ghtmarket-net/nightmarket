import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUrlSchema, insertSiteSettingsSchema } from "@shared/schema";
import { hashPassword, verifyPassword, generateToken, authenticateToken, requireAdmin, type AuthRequest } from "./auth";
import rateLimit from "express-rate-limit";
import { loginSchema, createUserSchema, appleIdAccessSchema, keyVerificationSchema } from "./validators";
import { logSecurityEvent, detectSuspiciousActivity, trackFailedLogin } from "./security";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate limiter for user creation
  const userCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // limit each IP to 3 user creations per hour
    message: { message: "Quá nhiều lần tạo tài khoản, vui lòng thử lại sau 1 giờ" }
  });

  // User management endpoints
  app.post("/api/users", userCreationLimiter, async (req, res) => {
    try {
      const validatedData = createUserSchema.parse(req.body);
      const { username, password } = validatedData;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
      }
      
      // Hash password before storing
      const hashedPassword = await hashPassword(password);
      const newUser = await storage.createUser({ username, password: hashedPassword });
      res.status(201).json({ message: "Tạo tài khoản thành công", user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi tạo tài khoản" });
      }
    }
  });

  // Authentication endpoint
  app.post("/api/auth/login", async (req, res) => {
    const clientIp = req.ip || req.connection?.remoteAddress || 'unknown';
    
    try {
      // Check for suspicious activity
      if (detectSuspiciousActivity(req)) {
        logSecurityEvent('SUSPICIOUS_LOGIN_ATTEMPT', { username: req.body?.username }, req);
        return res.status(403).json({ message: "Hoạt động đáng ngờ được phát hiện" });
      }
      
      // Check if IP is blocked due to too many failed attempts
      if (trackFailedLogin(clientIp)) {
        logSecurityEvent('IP_BLOCKED_TOO_MANY_ATTEMPTS', { ip: clientIp }, req);
        return res.status(429).json({ message: "IP tạm thời bị chặn do quá nhiều lần đăng nhập sai" });
      }
      
      const validatedData = loginSchema.parse(req.body);
      const { username, password } = validatedData;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        logSecurityEvent('LOGIN_FAILED_USER_NOT_FOUND', { username }, req);
        return res.status(401).json({ message: "Thông tin đăng nhập không chính xác" });
      }
      
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        logSecurityEvent('LOGIN_FAILED_WRONG_PASSWORD', { username }, req);
        return res.status(401).json({ message: "Thông tin đăng nhập không chính xác" });
      }
      
      const token = generateToken({ id: user.id, username: user.username });
      logSecurityEvent('LOGIN_SUCCESS', { username, userId: user.id }, req);
      
      res.json({ 
        message: "Đăng nhập thành công", 
        user: { id: user.id, username: user.username },
        token: token
      });
    } catch (error) {
      logSecurityEvent('LOGIN_ERROR', { error: error instanceof Error ? error.message : 'Unknown error' }, req);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi đăng nhập" });
      }
    }
  });

  // URL management endpoints - Protected routes
  app.get("/api/urls", async (req, res) => {
    try {
      const urls = await storage.getAllUrls();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch URLs" });
    }
  });

  app.post("/api/urls", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertUrlSchema.parse(req.body);
      const newUrl = await storage.createUrl(validatedData);
      res.status(201).json(newUrl);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create URL" });
      }
    }
  });

  app.put("/api/urls/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const validatedData = insertUrlSchema.partial().parse(req.body);
      
      const updatedUrl = await storage.updateUrl(id, validatedData);
      if (!updatedUrl) {
        return res.status(404).json({ message: "URL not found" });
      }
      
      res.json(updatedUrl);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update URL" });
      }
    }
  });

  app.delete("/api/urls/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const deleted = await storage.deleteUrl(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "URL not found" });
      }
      
      res.json({ message: "URL deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete URL" });
    }
  });

  // Site settings endpoints
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch site settings" });
    }
  });

  app.put("/api/settings", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = insertSiteSettingsSchema.partial().parse(req.body);
      const updatedSettings = await storage.updateSiteSettings(validatedData);
      res.json(updatedSettings);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update site settings" });
      }
    }
  });

  // Rental services endpoints
  app.get("/api/rental-services", async (req, res) => {
    try {
      const services = await storage.getAllRentalServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rental services" });
    }
  });

  app.put("/api/rental-services/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ message: "Service ID is required" });
      }
      
      const updatedService = await storage.updateRentalService(id, req.body);
      res.json(updatedService);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to update rental service" });
      }
    }
  });

  // Apple ID Access endpoints - Add rate limiting for key verification
  const keyVerifyLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // limit each IP to 3 attempts per 5 minutes
    message: { success: false, message: "Quá nhiều lần thử key, vui lòng thử lại sau 5 phút" }
  });

  app.post("/api/apple-id/verify-key", keyVerifyLimiter, async (req, res) => {
    try {
      const validatedData = keyVerificationSchema.parse(req.body);
      const { accessKey } = validatedData;
      
      const appleIdAccess = await storage.getAppleIdByKey(accessKey);
      if (!appleIdAccess || !appleIdAccess.isActive) {
        return res.status(404).json({ 
          success: false, 
          message: "Key không hợp lệ, đã được sử dụng hoặc đã hết hạn" 
        });
      }
      
      // Mark as used
      await storage.markAppleIdAsUsed(accessKey);
      
      res.json({ 
        success: true, 
        message: "Key hợp lệ",
        data: {
          appleId: appleIdAccess.appleId,
          applePassword: appleIdAccess.applePassword
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi server" });
      }
    }
  });

  // Admin endpoints for managing Apple ID access - PROTECTED
  app.get("/api/admin/apple-id-access", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const allAccess = await storage.getAllAppleIdAccess();
      res.json(allAccess);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Apple ID access data" });
    }
  });

  app.post("/api/admin/apple-id-access", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = appleIdAccessSchema.parse(req.body);
      const { accessKey, appleId, applePassword, isActive } = validatedData;
      
      // Check if key already exists
      const existingAccess = Array.from((await storage.getAllAppleIdAccess())).find(
        access => access.accessKey === accessKey
      );
      
      if (existingAccess) {
        return res.status(400).json({ message: "Key đã tồn tại" });
      }
      
      const newAccess = await storage.createAppleIdAccess({
        accessKey,
        appleId,
        applePassword,
        isActive: isActive ?? true,
        isUsed: false
      });
      
      res.status(201).json(newAccess);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi tạo Apple ID access" });
      }
    }
  });

  // Generate random key endpoint - PROTECTED
  app.post("/api/admin/apple-id-access/generate-key", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const validatedData = appleIdAccessSchema.omit({ accessKey: true }).parse(req.body);
      const { appleId, applePassword } = validatedData;
      
      // Generate random key
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let accessKey = '';
      for (let i = 0; i < 8; i++) {
        accessKey += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      
      // Ensure key is unique
      let isUnique = false;
      let attempts = 0;
      while (!isUnique && attempts < 10) {
        const existingAccess = Array.from((await storage.getAllAppleIdAccess())).find(
          access => access.accessKey === accessKey
        );
        
        if (!existingAccess) {
          isUnique = true;
        } else {
          accessKey = '';
          for (let i = 0; i < 8; i++) {
            accessKey += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          attempts++;
        }
      }
      
      if (!isUnique) {
        return res.status(500).json({ message: "Không thể tạo key duy nhất" });
      }
      
      const newAccess = await storage.createAppleIdAccess({
        accessKey,
        appleId,
        applePassword,
        isActive: true,
        isUsed: false
      });
      
      res.status(201).json(newAccess);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate Apple ID access key" });
    }
  });

  app.put("/api/admin/apple-id-access/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const updatedAccess = await storage.updateAppleIdAccess(id, updateData);
      if (!updatedAccess) {
        return res.status(404).json({ message: "Apple ID access not found" });
      }
      
      res.json(updatedAccess);
    } catch (error) {
      res.status(500).json({ message: "Failed to update Apple ID access" });
    }
  });

  app.delete("/api/admin/apple-id-access/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const deleted = await storage.deleteAppleIdAccess(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Apple ID access not found" });
      }
      
      res.json({ message: "Apple ID access deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Apple ID access" });
    }
  });

  // Maintenance mode endpoints - PROTECTED
  app.post("/api/maintenance/toggle", authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
      const { maintenanceMode } = req.body;
      
      if (typeof maintenanceMode !== 'boolean') {
        return res.status(400).json({ message: "maintenanceMode must be a boolean" });
      }
      
      const updatedSettings = await storage.updateSiteSettings({ maintenanceMode });
      res.json({ 
        success: true, 
        maintenanceMode: updatedSettings.maintenanceMode,
        message: maintenanceMode ? "Maintenance mode enabled" : "Maintenance mode disabled"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle maintenance mode" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
