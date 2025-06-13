import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUrlSchema, insertSiteSettingsSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);
  return httpServer;
}
