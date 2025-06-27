import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUrlSchema, insertSiteSettingsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User management endpoints
  app.post("/api/users", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser({ username, password });
      res.status(201).json({ message: "User created successfully", user: { id: newUser.id, username: newUser.username } });
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Authentication endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // URL management endpoints
  app.get("/api/urls", async (req, res) => {
    try {
      const urls = await storage.getAllUrls();
      res.json(urls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch URLs" });
    }
  });

  app.post("/api/urls", async (req, res) => {
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

  app.put("/api/urls/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
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

  app.delete("/api/urls/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
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

  app.put("/api/settings", async (req, res) => {
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

  app.put("/api/rental-services/:id", async (req, res) => {
    try {
      const id = req.params.id;
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

  // Apple ID Access endpoints
  app.post("/api/apple-id/verify-key", async (req, res) => {
    try {
      const { accessKey } = req.body;
      
      if (!accessKey) {
        return res.status(400).json({ 
          success: false, 
          message: "Key truy cập là bắt buộc" 
        });
      }
      
      const appleIdAccess = await storage.getAppleIdByKey(accessKey);
      if (!appleIdAccess) {
        return res.status(404).json({ 
          success: false, 
          message: "Key không hợp lệ, đã được sử dụng hoặc đã hết hạn" 
        });
      }
      
      // Mark as used (optional - for tracking)
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
      res.status(500).json({ 
        success: false, 
        message: "Đã xảy ra lỗi server" 
      });
    }
  });

  // Admin endpoints for managing Apple ID access
  app.get("/api/admin/apple-id-access", async (req, res) => {
    try {
      const allAccess = await storage.getAllAppleIdAccess();
      res.json(allAccess);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Apple ID access data" });
    }
  });

  app.post("/api/admin/apple-id-access", async (req, res) => {
    try {
      const { accessKey, appleId, applePassword, isActive } = req.body;
      
      if (!accessKey || !appleId || !applePassword) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
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
      res.status(500).json({ message: "Failed to create Apple ID access" });
    }
  });

  // Generate random key endpoint
  app.post("/api/admin/apple-id-access/generate-key", async (req, res) => {
    try {
      const { appleId, applePassword } = req.body;
      
      if (!appleId || !applePassword) {
        return res.status(400).json({ message: "Apple ID và mật khẩu là bắt buộc" });
      }
      
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

  app.put("/api/admin/apple-id-access/:id", async (req, res) => {
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

  app.delete("/api/admin/apple-id-access/:id", async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
