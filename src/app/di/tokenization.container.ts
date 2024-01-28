// containerSetup.js

import { asClass, asValue, createContainer } from 'awilix';
import dotenv from 'dotenv';
dotenv.config();

// Importaciones
import { RedisService } from '../../contexts/shared/infrastructure/redis/RedisService';
import TokenizationController from '../controllers/tokenization/TokenizationController';
import { TokenizationService } from '../../contexts/CardTokenization/application/services/TokenizationService';
import { TokenizeCardUseCase } from '../../contexts/CardTokenization/application/usecases/TokenizeCardUseCase';
import { GetCardDataUseCase } from '../../contexts/CardTokenization/application/usecases/GetCardDataUseCase';
import { CommandBus } from '../../contexts/shared/cqrs/CommandBus';
import { QueryBus } from '../../contexts/shared/cqrs/QueryBus';
import { EncryptionService } from '../../contexts/shared/infrastructure/crypto/EncryptionService';
import { TokenizeCardCommandHandler } from '../../contexts/CardTokenization/application/handlers/TokenizeCardCommandHandler';
import { TokenService } from '../../contexts/CardTokenization/infrestructure/services/TokenService';
import { GetCardDataQueryHandler } from '../../contexts/CardTokenization/application/handlers/GetCardDataQueryHandler';
 
const container = createContainer();

export const register = (container) => {
  container.register({
 
    redisService: asClass(RedisService).singleton(),
    encryptionService: asClass(EncryptionService).singleton(),
 
    secretKey: asValue(process.env.DATA_SECRET_KEY),
    jwtSecretKey: asValue(process.env.JWT_SECRET_KEY),
    
    tokenizationController: asClass(TokenizationController).singleton(),
   
    tokenizationService: asClass(TokenizationService).singleton(),
    tokenService: asClass(TokenService).singleton(),
  
    tokenizeCardUseCase: asClass(TokenizeCardUseCase).singleton(),
    getCardDataUseCase: asClass(GetCardDataUseCase).singleton(),
    
    commandBus: asClass(CommandBus).singleton(),
    queryBus: asClass(QueryBus).singleton(), 
    tokenizeCardCommandHandler: asClass(TokenizeCardCommandHandler).singleton(),
    getCardDataQueryHandler: asClass(GetCardDataQueryHandler).singleton() // Registra GetCardDataQueryHandler
  });
 
  const commandBus = container.resolve('commandBus');
  const queryBus = container.resolve('queryBus');
  commandBus.registerCommandHandler('TokenizeCardCommand', container.resolve('tokenizeCardCommandHandler'));
  queryBus.registerQueryHandler('GetCardDataQuery', container.resolve('getCardDataQueryHandler'));
};

export default container;
