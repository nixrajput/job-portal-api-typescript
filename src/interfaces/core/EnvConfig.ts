/**
 * Define EnvConfig interface
 */

export interface IEnvConfig {
  PORT: number | undefined;
  NODE_ENV: string | undefined;
  SERVER_MAINTENANCE: boolean | undefined;

  MONGO_URI: string | undefined;
  DB_NAME: string | undefined;

  API_PREFIX: string | undefined;

  CORS_ENABLED: boolean | undefined;
  LOG_DAYS: number | undefined;

  JWT_SECRET: string | undefined;
  JWT_EXPIRES_IN: string | undefined;

  SENDGRID_API_KEY: string | undefined;
  SMTP_FROM: string | undefined;

  CLOUDINARY_CLOUD_NAME: string | undefined;
  CLOUDINARY_API_KEY: string | undefined;
  CLOUDINARY_API_SECRET: string | undefined;
}
