import express from 'express';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './errors/errorMiddleware';
import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

app.use(express.json());

setupSwagger(app);

app.use('/auth', authRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação da API disponível em http://localhost:${port}/api-docs`);
});
