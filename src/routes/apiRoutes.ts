import express from 'express';
import authRoutes from './authRoutes';
import deviceRoutes from './deviceRoutes';
import plantRoutes from './plantRoutes';

const apiRoutes = express.Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/plants', plantRoutes);
apiRoutes.use('/device', deviceRoutes);

export default apiRoutes;
