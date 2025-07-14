import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { config, validateConfig } from './config/env';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './errors/errorMiddleware';

import apiRoutes from './routes/apiRoutes';

// Validate environment variables
validateConfig();

const app = express();

app.use(cors(config.cors));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: config.env.node,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

app.use('/api', apiRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(config.server.port, config.server.host, () => {
  console.log(`🚀 API rodando em http://${config.server.host}:${config.server.port}/api`);
  console.log(
    `📚 Documentação da API disponível em http://${config.server.host}:${config.server.port}/api-docs`,
  );
  console.log(`🌱 Frontend rodando em ${config.frontend.url}`);
  console.log(`🔧 Ambiente: ${config.env.node}`);
  console.log(`💚 Health check: http://${config.server.host}:${config.server.port}/health`);
});
