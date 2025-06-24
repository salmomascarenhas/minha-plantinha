import 'dotenv/config';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './errors/errorMiddleware';

import apiRoutes from './routes/apiRoutes';
import viewRoutes from './routes/viewRoutes';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());

app.set('layout', 'layout');
app.use('/', viewRoutes);

app.use('/api', apiRoutes);

setupSwagger(app);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`🚀 Servidor (backend) rodando em http://localhost:${port}/api`);
  console.log(`📚 Documentação da API disponível em http://localhost:${port}/api-docs`);
  console.log(`🌱 Servidor (frontend) rodando em http://localhost:${port}`);
});
