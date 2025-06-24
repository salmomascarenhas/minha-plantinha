import { Plant } from '@prisma/client';
import { UserData } from '../services/userService';

declare global {
  namespace Express {
    export interface Request {
      user?: UserData & { id: string };
      plant?: Plant;
    }
  }
}
