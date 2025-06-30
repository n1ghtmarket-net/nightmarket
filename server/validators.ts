import { z } from 'zod';

// Input sanitization helper
export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>'"]/g, '');
}

// Validation schemas
export const loginSchema = z.object({
  username: z.string()
    .min(3, "Tên đăng nhập phải từ 3-20 ký tự")
    .max(20, "Tên đăng nhập phải từ 3-20 ký tự")
    .regex(/^[a-zA-Z0-9_]+$/, "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới")
    .transform(sanitizeString),
  password: z.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(100, "Mật khẩu quá dài")
});

export const createUserSchema = loginSchema.extend({
  password: z.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(100, "Mật khẩu quá dài")
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt")
});

export const appleIdAccessSchema = z.object({
  accessKey: z.string()
    .length(8, "Access key phải có đúng 8 ký tự")
    .regex(/^[A-Z0-9]{8}$/, "Access key chỉ được chứa chữ cái in hoa và số")
    .transform(sanitizeString),
  appleId: z.string()
    .email("Apple ID phải là email hợp lệ")
    .max(100, "Apple ID quá dài")
    .transform(sanitizeString),
  applePassword: z.string()
    .min(1, "Apple Password là bắt buộc")
    .max(100, "Apple Password quá dài")
    .transform(sanitizeString),
  isActive: z.boolean().optional(),
  isUsed: z.boolean().optional()
});

export const keyVerificationSchema = z.object({
  accessKey: z.string()
    .length(8, "Access key phải có đúng 8 ký tự")
    .regex(/^[A-Z0-9]{8}$/, "Access key không đúng định dạng")
    .transform(sanitizeString)
});
