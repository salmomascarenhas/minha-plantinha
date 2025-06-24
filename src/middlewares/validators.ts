import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestError } from '../errors/httpErrors';

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
    email: z
      .string({ required_error: 'O email é obrigatório.' })
      .email('Formato de email inválido.'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .regex(new RegExp('.*[A-Z].*'), 'A senha deve conter pelo menos uma letra maiúscula.')
      .regex(new RegExp('.*[0-9].*'), 'A senha deve conter pelo menos um número.')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\]].*'),
        'A senha deve conter pelo menos um símbolo.',
      ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'O email é obrigatório.' })
      .email('Formato de email inválido.'),
    password: z.string({ required_error: 'A senha é obrigatória.' }),
  }),
});

export const validate =
  (schema: z.ZodObject<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} - ${issue.message}`,
        }));
        next(new BadRequestError('Erro de validação.', errorMessages));
      }
      next(new BadRequestError('Erro de validação.'));
    }
  };
