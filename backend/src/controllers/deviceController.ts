import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../errors/httpErrors';
import * as dataService from '../services/dataService';
import * as deviceService from '../services/deviceService';

export const submitSensorData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.plant) throw new NotFoundError('Dispositivo não identificado pela autenticação.');

  const {
    umidade,
    chuva,
    status_bomba,
    status_lona,
    status_solo,
    status_wifi,
    nivel_agua,
    temperature,
    luminosity,
  } = req.body;

  const dataForDb = {
    humidity: umidade,
    wifiSignal: status_wifi,
    waterLevel: nivel_agua,
    soilStatus: status_solo,
    temperature: temperature,
    luminosity: luminosity,
    rainDetected: typeof chuva !== 'undefined' ? chuva === 0 : undefined,
    pumpStatus: typeof status_bomba !== 'undefined' ? status_bomba === 1 : undefined,
    coverStatus: typeof status_lona !== 'undefined' ? status_lona === 1 : undefined,
  };

  const newReading = await dataService.saveSensorData(req.plant.id, dataForDb);

  res.status(201).json({ message: 'Dados recebidos com sucesso.', data: newReading });
});

export const fetchCommand = asyncHandler(async (req: Request, res: Response) => {
  if (!req.plant) throw new NotFoundError('Dispositivo não identificado.');

  const command = await deviceService.getAndClearPendingCommand(req.plant.id);
  res.status(200).json({ command });
});
