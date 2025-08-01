/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

export const config = {
  // Server Configuration
  server: {
    port: Number(process.env.BACKEND_PORT || process.env.PORT || 3000),
    host: process.env.BACKEND_HOST || '0.0.0.0',
    url: process.env.BACKEND_URL || 'http://localhost:3000',
  },

  // Environment
  env: {
    node: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || '',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT || 5432),
    name: process.env.POSTGRES_DB || 'minha_plantinha',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
  },

  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_for_development_only',
  },

  // External APIs
  apis: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
  },

  // Frontend Configuration (for reference)
  frontend: {
    port: Number(process.env.FRONTEND_PORT || 5173),
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
  },

  // CORS Configuration
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.BACKEND_URL?.replace('/api', '') || 'http://localhost']
        : '*',
    credentials: true,
  },
};

// Validation function to check required environment variables
export const validateConfig = (): void => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    process.exit(1);
  }

  if (
    config.env.isProduction &&
    config.security.jwtSecret === 'fallback_secret_for_development_only'
  ) {
    console.error('❌ JWT_SECRET must be set in production');
    process.exit(1);
  }

  console.log('✅ Environment configuration validated');
};

export default config;
