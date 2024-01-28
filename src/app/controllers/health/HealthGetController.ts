import status from 'http-status';
import { Request, Response } from 'express';
import * as packageJSON from '../../../../package.json';
import { IBaseController } from '../../../contexts/shared/infrastructure/interfaces/IBaseController';
import { config } from '../../config';

export default class HealthGetController implements IBaseController {
  run = async (req: Request, res: Response): Promise<void> => {
    
    const health = {
      status: 'ok',
      name: packageJSON.name,
      version: packageJSON.version,
      environment: config.get('env')
    };
    res.status(status.OK).send(health);
  };
}
