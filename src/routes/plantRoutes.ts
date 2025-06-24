import { Router } from 'express';
import * as plantController from '../controllers/plantController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { plantSchema, validate } from '../middlewares/validators';

const router = Router();

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Cadastra uma nova planta para o usuário autenticado
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - species
 *               - deviceId
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               deviceId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Planta cadastrada com sucesso
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido)
 *       409:
 *         description: Conflito (dispositivo já em uso)
 */
router.post('/', authMiddleware, validate(plantSchema), plantController.create);

export default router;
