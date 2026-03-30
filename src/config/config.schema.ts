import z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_URL: z.url(),

  ARGON2_MEMORY_COST: z.coerce.number().min(1).max(1048576).default(65536),
  ARGON2_TIME_COST: z.coerce.number().min(1).default(3),
  ARGON2_PARALLELISM: z.coerce.number().min(1).default(4),
  ARGON2_PEPPER: z.string().min(1).max(256),

  AUTH_MAX_FAILED_ATTEMPTS: z.coerce.number().min(1).default(5),
  AUTH_LOCK_DURATION_MINUTES: z.coerce.number().min(1).default(15),

  TOKEN_EMAIL_VERIFY_EXPIRES_MINUTES: z.coerce.number().min(1).default(60),
  TOKEN_EMAIL_CHANGE_EXPIRES_MINUTES: z.coerce.number().min(1).default(60),
  TOKEN_PASSWORD_RESET_EXPIRES_MINUTES: z.coerce.number().min(1).default(15),

  JWT_ACCESS_SECRET: z.string().min(30),
  JWT_REFRESH_SECRET: z.string().min(30),
  JWT_ACCESS_EXPIRES_MINUTES: z.coerce.number().min(5),
  JWT_REFRESH_EXPIRES_DAYS: z.coerce.number().min(1),

  RESEND_API_KEY: z.string().min(30),
  MAIL_FROM_EMAIL: z.email(),
  APP_URL: z.url(),

  THROTTLE_DEFAULT_TTL: z.coerce.number().min(1).default(60000),
  THROTTLE_DEFAULT_LIMIT: z.coerce.number().min(1).default(100),
  THROTTLE_AUTH_TTL: z.coerce.number().min(1).default(60000),
  THROTTLE_AUTH_LIMIT: z.coerce.number().min(1).default(5),

  CLOUDINARY_CLOUD_NAME: z.string().min(1).max(255),
  CLOUDINARY_API_KEY: z.string().min(1).max(255),
  CLOUDINARY_API_SECRET: z.string().min(1).max(255),
});
