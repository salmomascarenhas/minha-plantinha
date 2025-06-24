import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../errors/httpErrors';
import * as dataService from '../services/dataService';
import * as deviceService from '../services/deviceService';

export const submitSensorData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.plant) throw new NotFoundError('Dispositivo não identificado pela autenticação.');
  const newReading = await dataService.saveSensorData(req.plant.id, req.body);
  res.status(201).json({ message: 'Dados recebidos com sucesso.', data: newReading });
});

export const fetchCommand = asyncHandler(async (req: Request, res: Response) => {
  if (!req.plant) throw new NotFoundError('Dispositivo não identificado.');

  const command = await deviceService.getAndClearPendingCommand(req.plant.id);
  res.status(200).json({ command });
});
