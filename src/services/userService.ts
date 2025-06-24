import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export type UserData = Omit<User, 'password'>;

export const createUser = async (
  data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<UserData> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) throw new Error('Email já cadastrado.');

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};
