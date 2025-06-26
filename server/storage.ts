import { users, urls, siteSettings, appleIdAccess, type User, type InsertUser, type Url, type InsertUrl, type SiteSettings, type InsertSiteSettings, type AppleIdAccess, type InsertAppleIdAccess } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // URL methods
  getAllUrls(): Promise<Url[]>;
  getUrl(id: number): Promise<Url | undefined>;
  createUrl(url: InsertUrl): Promise<Url>;
  updateUrl(id: number, url: Partial<InsertUrl>): Promise<Url | undefined>;
  deleteUrl(id: number): Promise<boolean>;

  // Site settings methods
  getSiteSettings(): Promise<SiteSettings>;
  updateSiteSettings(settings: Partial<InsertSiteSettings>): Promise<SiteSettings>;

  // Rental Services Methods
  getAllRentalServices(): Promise<any[]>;
  updateRentalService(id: string, service: any): Promise<any>;

  // Apple ID Access Methods
  getAllAppleIdAccess(): Promise<AppleIdAccess[]>;
  getAppleIdByKey(accessKey: string): Promise<AppleIdAccess | undefined>;
  createAppleIdAccess(access: InsertAppleIdAccess): Promise<AppleIdAccess>;
  updateAppleIdAccess(id: number, access: Partial<InsertAppleIdAccess>): Promise<AppleIdAccess | undefined>;
  deleteAppleIdAccess(id: number): Promise<boolean>;
  markAppleIdAsUsed(accessKey: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private urls: Map<number, Url>;
  private siteSettings: SiteSettings;
  private appleIdAccess: Map<number, AppleIdAccess>;
  private currentUserId: number;
  private currentUrlId: number;

  constructor() {
    this.users = new Map();
    this.urls = new Map();
    this.appleIdAccess = new Map();
    this.currentUserId = 1;
    this.currentUrlId = 1;

    // Initialize default admin user
    this.users.set(1, {
      id: 1,
      username: "admin",
      password: "Camtien2002@"
    });
    this.currentUserId = 2;

    // Initialize Apple ID access keys
    this.initializeAppleIdData();

    // Initialize default modules
    this.urls.set(1, {
      id: 1,
      name: "All In One",
      address: "https://raw.githubusercontent.com/dhungx/modules-shadowrocket/refs/heads/main/all-in-one.conf",
      description: "Tất cả các module premium trong một file duy nhất",
      icon: "fas fa-rocket",
      category: "module",
      featured: true,
      status: "active",
      createdAt: new Date()
    });

    this.urls.set(2, {
      id: 2,
      name: "YouTube Premium",
      address: "https://raw.githubusercontent.com/NightmarketServer/Youtube-Premium/refs/heads/main/YouTubePre.module",
      description: "Không quảng cáo, phát nền, chất lượng cao",
      icon: "fab fa-youtube",
      category: "module",
      featured: false,
      status: "active",
      createdAt: new Date()
    });

    this.urls.set(3, {
      id: 3,
      name: "Spotify Premium",
      address: "https://raw.githubusercontent.com/NightmarketServer/Spotify-Premium/refs/heads/main/SpotifyPre.module",
      description: "Nghe nhạc không giới hạn, chất lượng cao",
      icon: "fab fa-spotify",
      category: "module",
      featured: false,
      status: "active",
      createdAt: new Date()
    });

    this.urls.set(4, {
      id: 4,
      name: "SoundCloud Plus",
      address: "https://raw.githubusercontent.com/NightmarketServer/SoundCloudPlus/refs/heads/main/soundcloudplus.module",
      description: "Phát nhạc offline, không quảng cáo",
      icon: "fab fa-soundcloud",
      category: "module",
      featured: false,
      status: "active",
      createdAt: new Date()
    });

    this.urls.set(5, {
      id: 5,
      name: "Locket gold",
      address: "https://raw.githubusercontent.com/NightmarketServer/Locket/refs/heads/main/locket.module",
      description: "Widget chia sẻ ảnh với bạn bè",
      icon: "fas fa-heart",
      category: "module",
      featured: false,
      status: "active",
      createdAt: new Date()
    });

    this.currentUrlId = 6;

    // Initialize default site settings
    this.siteSettings = {
      id: 1,
      siteTitle: "NightMarket Server",
      siteDescription: "Premium destination for exclusive modules",
      maintenanceMode: false
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllUrls(): Promise<Url[]> {
    return Array.from(this.urls.values()).sort((a, b) => a.id - b.id);
  }

  async getUrl(id: number): Promise<Url | undefined> {
    return this.urls.get(id);
  }

  async createUrl(insertUrl: InsertUrl): Promise<Url> {
    const id = this.currentUrlId++;
    const url: Url = { 
      id,
      name: insertUrl.name,
      address: insertUrl.address,
      description: insertUrl.description || null,
      icon: insertUrl.icon || "fas fa-puzzle-piece",
      category: insertUrl.category || "module",
      featured: insertUrl.featured || false,
      status: insertUrl.status || "active",
      createdAt: new Date()
    };
    this.urls.set(id, url);
    return url;
  }

  async updateUrl(id: number, updateData: Partial<InsertUrl>): Promise<Url | undefined> {
    const existingUrl = this.urls.get(id);
    if (!existingUrl) {
      return undefined;
    }

    // Ensure we preserve all required fields and update only what's provided
    const updatedUrl: Url = { 
      ...existingUrl, 
      ...updateData,
      // Ensure fields are properly trimmed and validated
      name: updateData.name?.trim() || existingUrl.name,
      address: updateData.address?.trim() || existingUrl.address,
      description: updateData.description?.trim() || existingUrl.description
    };
    
    this.urls.set(id, updatedUrl);
    
    // Log the update for debugging
    console.log('Updated URL:', { id, before: existingUrl, after: updatedUrl });
    
    return updatedUrl;
  }

  async deleteUrl(id: number): Promise<boolean> {
    return this.urls.delete(id);
  }

  async getSiteSettings(): Promise<SiteSettings> {
    return this.siteSettings;
  }

  async updateSiteSettings(settings: Partial<InsertSiteSettings>): Promise<SiteSettings> {
    this.siteSettings = { ...this.siteSettings, ...settings };
    return this.siteSettings;
  }

  // Rental Services Methods
  async getAllRentalServices(): Promise<any[]> {
    // For now, return hardcoded data that matches the current rental services
    return [
      {
        id: "apple-id",
        name: "Apple ID",
        icon: "SiApple",
        description: "Tài khoản Apple ID có sẵn Minecraft và các ứng dụng khác",
        price: "20.000đ",
        contact: "discord",
        featured: true,
        gradient: "from-gray-900 to-black",
        status: "active"
      },
      {
        id: "apple-id-other",
        name: "Apple ID (Apps khác)",
        icon: "SiApple",
        description: "Các tài khoản Apple ID với ứng dụng khác nhau",
        price: "Liên hệ",
        contact: "discord",
        gradient: "from-blue-500 to-blue-700",
        status: "active"
      },
      {
        id: "netflix",
        name: "Netflix",
        icon: "SiNetflix",
        description: "Tài khoản Netflix Premium với chất lượng cao",
        price: "70.000đ - 500.000đ",
        contact: "discord",
        gradient: "from-red-600 to-red-800",
        status: "active"
      },
      {
        id: "spotify",
        name: "Spotify Premium",
        icon: "SiSpotify",
        description: "Tài khoản Spotify Premium không quảng cáo",
        price: "Liên hệ",
        contact: "discord",
        gradient: "from-green-500 to-green-700",
        status: "active"
      },
      {
        id: "youtube",
        name: "YouTube Premium",
        icon: "SiYoutube",
        description: "Tài khoản YouTube Premium không quảng cáo",
        price: "Liên hệ",
        contact: "discord",
        gradient: "from-red-500 to-red-700",
        status: "active"
      }
    ];
  }

  async updateRentalService(id: string, service: any): Promise<any> {
    // For now, just return the updated service
    // In a real implementation, this would update a database
    return { id, ...service };
  }

  private initializeAppleIdData() {
    // Sample Apple ID access keys
    const sampleAccess: AppleIdAccess[] = [
      {
        id: 1,
        accessKey: "DEMO2024",
        appleId: "demo@icloud.com",
        applePassword: "DemoPass123",
        isActive: true,
        isUsed: false,
        createdAt: new Date(),
        usedAt: null,
      },
      {
        id: 2, 
        accessKey: "FREE2024",
        appleId: "free@icloud.com",
        applePassword: "FreePass456",
        isActive: true,
        isUsed: false,
        createdAt: new Date(),
        usedAt: null,
      }
    ];

    sampleAccess.forEach(access => {
      this.appleIdAccess.set(access.id, access);
    });
  }

  async getAllAppleIdAccess(): Promise<AppleIdAccess[]> {
    return Array.from(this.appleIdAccess.values());
  }

  async getAppleIdByKey(accessKey: string): Promise<AppleIdAccess | undefined> {
    return Array.from(this.appleIdAccess.values()).find(access => 
      access.accessKey === accessKey && access.isActive && !access.isUsed
    );
  }

  async createAppleIdAccess(insertAccess: InsertAppleIdAccess): Promise<AppleIdAccess> {
    const id = Date.now();
    const access: AppleIdAccess = {
      id,
      accessKey: insertAccess.accessKey,
      appleId: insertAccess.appleId,
      applePassword: insertAccess.applePassword,
      isActive: insertAccess.isActive ?? true,
      isUsed: insertAccess.isUsed ?? false,
      createdAt: new Date(),
      usedAt: insertAccess.usedAt || null,
    };
    this.appleIdAccess.set(id, access);
    return access;
  }

  async updateAppleIdAccess(id: number, updateData: Partial<InsertAppleIdAccess>): Promise<AppleIdAccess | undefined> {
    const existingAccess = this.appleIdAccess.get(id);
    if (!existingAccess) return undefined;

    const updatedAccess: AppleIdAccess = { ...existingAccess, ...updateData };
    this.appleIdAccess.set(id, updatedAccess);
    return updatedAccess;
  }

  async deleteAppleIdAccess(id: number): Promise<boolean> {
    return this.appleIdAccess.delete(id);
  }

  async markAppleIdAsUsed(accessKey: string): Promise<void> {
    const access = Array.from(this.appleIdAccess.values()).find(a => a.accessKey === accessKey);
    if (access) {
      access.isUsed = true;
      access.usedAt = new Date();
      this.appleIdAccess.set(access.id, access);
    }
  }
}

// DatabaseStorage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUrls(): Promise<Url[]> {
    return await db.select().from(urls);
  }

  async getUrl(id: number): Promise<Url | undefined> {
    const [url] = await db.select().from(urls).where(eq(urls.id, id));
    return url || undefined;
  }

  async createUrl(insertUrl: InsertUrl): Promise<Url> {
    const [url] = await db
      .insert(urls)
      .values(insertUrl)
      .returning();
    return url;
  }

  async updateUrl(id: number, updateData: Partial<InsertUrl>): Promise<Url | undefined> {
    const [url] = await db
      .update(urls)
      .set(updateData)
      .where(eq(urls.id, id))
      .returning();
    return url || undefined;
  }

  async deleteUrl(id: number): Promise<boolean> {
    const result = await db.delete(urls).where(eq(urls.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getSiteSettings(): Promise<SiteSettings> {
    const [settings] = await db.select().from(siteSettings).limit(1);
    if (!settings) {
      // Create default settings if none exist
      const [newSettings] = await db
        .insert(siteSettings)
        .values({
          siteTitle: "NightMarket Server",
          siteDescription: "Premium destination for exclusive modules",
          maintenanceMode: false,
        })
        .returning();
      return newSettings;
    }
    return settings;
  }

  async updateSiteSettings(settings: Partial<InsertSiteSettings>): Promise<SiteSettings> {
    const existing = await this.getSiteSettings();
    const [updated] = await db
      .update(siteSettings)
      .set(settings)
      .where(eq(siteSettings.id, existing.id))
      .returning();
    return updated;
  }

  async getAllRentalServices(): Promise<any[]> {
    // For now, return static data as rental services aren't stored in DB yet
    return [];
  }

  async updateRentalService(id: string, service: any): Promise<any> {
    // For now, just return the updated service
    return { id, ...service };
  }

  async getAllAppleIdAccess(): Promise<AppleIdAccess[]> {
    return await db.select().from(appleIdAccess);
  }

  async getAppleIdByKey(accessKey: string): Promise<AppleIdAccess | undefined> {
    const [access] = await db
      .select()
      .from(appleIdAccess)
      .where(eq(appleIdAccess.accessKey, accessKey));
    return access || undefined;
  }

  async createAppleIdAccess(insertAccess: InsertAppleIdAccess): Promise<AppleIdAccess> {
    const [access] = await db
      .insert(appleIdAccess)
      .values(insertAccess)
      .returning();
    return access;
  }

  async updateAppleIdAccess(id: number, updateData: Partial<InsertAppleIdAccess>): Promise<AppleIdAccess | undefined> {
    const [access] = await db
      .update(appleIdAccess)
      .set(updateData)
      .where(eq(appleIdAccess.id, id))
      .returning();
    return access || undefined;
  }

  async deleteAppleIdAccess(id: number): Promise<boolean> {
    const result = await db.delete(appleIdAccess).where(eq(appleIdAccess.id, id));
    return (result.rowCount || 0) > 0;
  }

  async markAppleIdAsUsed(accessKey: string): Promise<void> {
    await db
      .update(appleIdAccess)
      .set({ 
        isUsed: true, 
        usedAt: new Date() 
      })
      .where(eq(appleIdAccess.accessKey, accessKey));
  }
}

export const storage = new DatabaseStorage();
