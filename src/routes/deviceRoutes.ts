import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';
import { deviceAuthMiddleware } from '../middlewares/deviceAuthMiddleware';
import { sensorDataSchema, validate } from '../middlewares/validators';

const router = Router();

/**
 * @swagger
 * /device/sensor-readings:
 *   post:
 *     summary: Dispositivo envia leituras dos sensores
 *     tags: [Dispositivo]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *               humidity:
 *                 type: number
 *               luminosity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Dados recebidos com sucesso
 *       401:
 *         description: Não autorizado (API Key inválida ou ausente)
 */
router.post(
  '/sensor-readings',
  deviceAuthMiddleware,
  validate(sensorDataSchema),
  deviceController.submitSensorData,
);

/**
 * @swagger
 * /device/commands:
 *   get:
 *     summary: Dispositivo busca por comandos pendentes
 *     tags: [Dispositivo]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna o comando pendente (ou nulo se não houver)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 command:
 *                   type: object
 *                   nullable: true
 *                   description: O comando pendente ou null se não houver
 *       401:
 *         description: Não autorizado (API Key inválida ou ausente)
 */
router.get('/commands', deviceAuthMiddleware, deviceController.fetchCommand);

export default router;
