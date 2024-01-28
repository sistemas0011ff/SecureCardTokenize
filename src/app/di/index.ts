// Importando los módulos necesarios
import * as glob from 'glob';
import { asClass, asValue, createContainer, InjectionMode } from 'awilix';
import { RequestLoggerMiddleware } from '../middlewares/RequestLoggerMiddleware';
import { AxiosApiClient } from '../../contexts/shared/infrastructure/axios/AxiosApiClient';
import { InMemoryAsyncEventBus } from '../../contexts/shared/infrastructure/eventBus/inmemory/InMemoryAsyncEventBus';
import { OracleDatabaseService } from '../../contexts/shared/infrastructure/database/OracleDatabaseService';
// import { createOracleDbConnection } from '../../contexts/shared/infrastructure/connections/createOracleDbConnection';
// import { OracleUnitOfWork } from '../../contexts/shared/uow/OracleUnitOfWork';
// import { createOracleDbConnection } from '../../contexts/shared/infrastructure/connections/createOracleDbConnection';
// import createOracleDbConnection from '../../contexts/shared/infrastructure/connections/createOracleDbConnection';
// import { createOracleDbConnection } from '../../contexts/shared/infrastructure/connections/createOracleDbConnection';


// Creación de un contenedor de inyección de depe ndencias con Awilix
export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

// Registro de los servicios, middlewares, repositorios, etc. en el contenedor
container.register({

  // connection: asFunction(createOracleDbConnection).singleton(),

  // oracleDbConnection: asFunction(createOracleDbConnection).singleton(),
  // oracleUnitOfWork: asClass(OracleUnitOfWork).inject(() => ({
  //   dbConnection: container.resolve('oracleDbConnection')
  // })).singleton(),
  
  // Este nombre de contexto se utiliza para la identificación en logs y eventos
  contextName: asValue('pry-secure-card-tokenize.api'),

  // Middleware para registrar las solicitudes
  loggerMiddleware: asClass(RequestLoggerMiddleware).classic().singleton(),

  // Cliente para realizar peticiones HTTP
  client: asClass(AxiosApiClient).classic().singleton(),

  // Servicio de bus de eventos en memoria
  eventBus: asClass(InMemoryAsyncEventBus).classic(),

  // Servicio de base de datos Oracle
  databaseService: asValue(OracleDatabaseService.getInstance()),

 


});

// Función para configurar el contenedor, registrando los módulos en el contenedor
export function configureContainer() {
  const dirname = process.platform === 'win32' ? __dirname.replace(/\\/g, '/') : __dirname;
  const routes = glob.sync(dirname + '/**/*.container.*');
  routes.forEach(route => register(route));
}

// Función para registrar una ruta en el contenedor
function register(routePath: string) {
  const route = require(routePath);
  route.register(container);
}
