import express from 'express';
import authRoutes from './authRoutes';
import deviceRoutes from './deviceRoutes';
import gamificationRoutes from './gamificationRoutes';
import plantRoutes from './plantRoutes';

const apiRoutes = express.Router();
apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/plants', plantRoutes);
apiRoutes.use('/device', deviceRoutes);
apiRoutes.use('/gamification', gamificationRoutes);

export default apiRoutes;
