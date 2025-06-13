import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  description: text("description"),
  icon: text("icon").default("fas fa-puzzle-piece"),
  category: text("category").default("module"),
  featured: boolean("featured").default(false),
  status: text("status").default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteTitle: text("site_title").notNull().default("NightMarket Server"),
  siteDescription: text("site_description").notNull().default("Premium destination for exclusive modules"),
  maintenanceMode: boolean("maintenance_mode").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUrlSchema = createInsertSchema(urls).pick({
  name: true,
  address: true,
  description: true,
  icon: true,
  category: true,
  featured: true,
  status: true,
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).pick({
  siteTitle: true,
  siteDescription: true,
  maintenanceMode: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUrl = z.infer<typeof insertUrlSchema>;
export type Url = typeof urls.$inferSelect;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

// Rental Service Schema
export const rentalServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  description: z.string(),
  price: z.string(),
  contact: z.string(),
  featured: z.boolean().default(false),
  gradient: z.string(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export const insertRentalServiceSchema = rentalServiceSchema.omit({ id: true });

export type RentalService = z.infer<typeof rentalServiceSchema>;
export type InsertRentalService = z.infer<typeof insertRentalServiceSchema>;