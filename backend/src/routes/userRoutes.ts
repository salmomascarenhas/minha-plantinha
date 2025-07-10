import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Dados do usuário retornados com sucesso.
 *       '401':
 *         description: Não autorizado.
 */
router.get('/me', authMiddleware, userController.getMe);

export default router;
