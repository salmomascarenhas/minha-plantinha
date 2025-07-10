import { Router } from 'express';
import * as aiController from '../controllers/aiController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /ai/generate-report:
 *   post:
 *     summary: Gera um novo relatório de saúde para uma planta usando IA
 *     tags: [IA]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plantId:
 *                 type: string
 *                 description: O ID da planta para a qual o relatório será gerado
 *     responses:
 *       '201':
 *         description: Relatório gerado e salvo com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AiInsight'
 *       '400':
 *         description: ID da planta não fornecido
 *       '401':
 *         description: Não autorizado
 *       '404':
 *         description: Planta não encontrada
 */
router.route('/generate-report').post(authMiddleware, aiController.generateAiReport);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     AiInsight:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [HEALTH_REPORT, DAILY_TIP]
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         plantId:
 *           type: string
 */
