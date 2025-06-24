import 'dotenv/config';
import express from 'express';
import path from 'path';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './errors/errorMiddleware';

import apiRoutes from './routes/apiRoutes';
import viewRoutes from './routes/viewRoutes';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());

app.use('/', viewRoutes);

app.use('/api', apiRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Documentação da API disponível em http://localhost:${port}/api-docs`);
});
