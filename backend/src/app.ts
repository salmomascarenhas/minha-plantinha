import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './errors/errorMiddleware';

import apiRoutes from './routes/apiRoutes';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.use('/api', apiRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
  console.log(`📚 Documentação da API disponível em http://localhost:${port}/api-docs`);
  console.log(`🌱 Frontend rodando em http://localhost:5173`);
});
