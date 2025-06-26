import { Router } from 'express';
import * as plantController from '../controllers/plantController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { historyQuerySchema, plantSchema, validate } from '../middlewares/validators';

const router = Router();

/**
 * @swagger
 * /plants/my-plant:
 *   get:
 *     summary: Retorna os dados da planta principal do usuário e a última leitura dos sensores
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dados da planta e dos sensores retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 species:
 *                   type: string
 *                 deviceId:
 *                   type: string
 *                 pendingCommand:
 *                   type: object
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 userId:
 *                   type: string
 *                 SensorData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       temperature:
 *                         type: number
 *                         format: float
 *                       humidity:
 *                         type: number
 *                         format: float
 *                       luminosity:
 *                         type: number
 *                         format: float
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Nenhuma planta encontrada para o usuário
 */
router.get('/my-plant', authMiddleware, plantController.getMyPlantData);

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

/**
 * @swagger
 * /plants/{plantId}/command:
 *   post:
 *     summary: Envia um comando para a planta do usuário autenticado
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da planta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Comando a ser enviado para o dispositivo da planta
 *     responses:
 *       200:
 *         description: Comando enviado para a fila do dispositivo
 *       401:
 *         description: Não autorizado (token inválido ou não fornecido)
 *       404:
 *         description: Planta não encontrada ou não pertence a este usuário
 */
router.post('/:plantId/command', authMiddleware, plantController.issueCommand);

/**
 * @swagger
 * /plants/{plantId}/history:
 *   get:
 *     summary: Retorna o histórico de dados dos sensores para uma planta específica
 *     tags: [Plantas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plantId
 *         required: true
 *         schema:
 *           type: string
 *         description: O ID da planta
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, all]
 *           default: 7d
 *         description: O período para o qual buscar o histórico (7 dias, 30 dias, ou todos).
 *     responses:
 *       200:
 *         description: Histórico de dados retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   temperature:
 *                     type: number
 *                   humidity:
 *                     type: number
 *                   luminosity:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Planta não encontrada ou não pertence ao usuário
 */
router.get(
  '/:plantId/history',
  authMiddleware,
  validate(historyQuerySchema),
  plantController.getPlantHistory,
);

export default router;
