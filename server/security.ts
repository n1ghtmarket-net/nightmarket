// Security utilities and monitoring
import { Request } from 'express';

// Security event logging
export function logSecurityEvent(event: string, details: any, req?: Request) {
  const timestamp = new Date().toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress || 'unknown';
  const userAgent = req?.get('User-Agent') || 'unknown';
  
  console.log(`[SECURITY] ${timestamp} - ${event}`, {
    ip,
    userAgent,
    ...details
  });
}

// Detect suspicious activity patterns
export function detectSuspiciousActivity(req: Request): boolean {
  const userAgent = req.get('User-Agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /scanner/i,
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

// IP rate limiting tracker
const ipAttempts = new Map<string, { count: number; lastAttempt: number }>();

export function trackFailedLogin(ip: string): boolean {
  const now = Date.now();
  const existing = ipAttempts.get(ip);
  
  if (!existing) {
    ipAttempts.set(ip, { count: 1, lastAttempt: now });
    return false;
  }
  
  // Reset if more than 1 hour passed
  if (now - existing.lastAttempt > 3600000) {
    ipAttempts.set(ip, { count: 1, lastAttempt: now });
    return false;
  }
  
  existing.count++;
  existing.lastAttempt = now;
  
  // Block if more than 10 failed attempts in 1 hour
  return existing.count > 10;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  ipAttempts.forEach((data, ip) => {
    if (now - data.lastAttempt > 3600000) {
      keysToDelete.push(ip);
    }
  });
  
  keysToDelete.forEach(ip => ipAttempts.delete(ip));
}, 300000); // Clean every 5 minutes
