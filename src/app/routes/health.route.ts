import { Router } from 'express';
import { container } from '../di/index';

export const register = (router: Router): void => {
  const controller = container.resolve('healthGetController');
 
  router.get(
    '/health',
    controller.run
  );
  
};


