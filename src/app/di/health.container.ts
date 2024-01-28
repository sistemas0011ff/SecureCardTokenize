import { asClass } from 'awilix';
import HealthGetController from '../controllers/health/HealthGetController';

export const register = container => {
  container.register({
    healthGetController: asClass(HealthGetController).classic(),
  });
};