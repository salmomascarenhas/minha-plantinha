import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password)
      res.status(400).json({ message: 'Todos os campos são obrigatórios.' });

    const newUser = await userService.createUser({ email, name, password });

    res.status(201).json(newUser);
  } catch (error: any) {
    if (error.message === 'Email já cadastrado.') res.status(409).json({ message: error.message });

    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};
