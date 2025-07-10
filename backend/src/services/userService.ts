import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConflictError, NotFoundError, UnauthorizedError } from '../errors/httpErrors';
import * as gamificationService from './gamificationService';

const prisma = new PrismaClient();

export type UserData = Omit<User, 'password'>;
type LoginPayload = Pick<User, 'email' | 'password'>;

export const createUser = async (
  data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<UserData> => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new ConflictError('Email já cadastrado.');
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  await gamificationService.unlockAchievement(newUser.id, 'FIRST_LOGIN');

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<{ user: UserData; token: string }> => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) throw new NotFoundError('Usuário não encontrado.');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedError('Credenciais inválidas.');

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('A chave secreta JWT não está definida.');

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: '8h',
  });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
