import { Router } from 'express';
import * as gamificationController from '../controllers/gamificationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /gamification/status:
 *   get:
 *     summary: Retorna os pontos e conquistas do usuário autenticado
 *     tags: [Gamificação]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Status de gamificação retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: integer
 *                 achievements:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserAchievement'
 *       401:
 *         description: Não autorizado
 */
router.get('/status', authMiddleware, gamificationController.getGamificationStatus);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *     UserAchievement:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         unlockedAt:
 *           type: string
 *           format: date-time
 *         userId:
 *           type: string
 *         achievementId:
 *           type: string
 *         achievement:
 *           $ref: '#/components/schemas/Achievement'
 */
