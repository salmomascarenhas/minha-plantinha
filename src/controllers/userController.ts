import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as userService from '../services/userService';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body);
  res.status(200).json(result);
});
