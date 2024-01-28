import compress from 'compression';
// import { Apm } from './apm';
import './apm';
import express, { NextFunction, Request, Response } from 'express';
import Router from 'express-promise-router';
import rtracer from 'cls-rtracer';
import helmet from 'helmet';
import cors from 'cors';
import * as http from 'http';
import httpStatus from 'http-status';
import { registerRoutes } from './routes';
import { Logger, LoggerPino } from './logger';
import { Uuid } from '../contexts/shared/domain/valueobject/Uuid';
import { errorHandler } from './middlewares/errorHandler'; 
import { setUpSwagger } from './swagger';

export interface RequestWithRawBody extends Request {
  rawBody?: string;
}
 
export class Server {
  private express: express.Express;
  private appName: string;
  private enviroment: string;
  private basePath: string;
  private port: string;
  private httpServer?: http.Server;
  private log: Logger = new Logger(LoggerPino.create());

  constructor(appName: string, basePath: string, port: string, enviroment: string) {
    this.log.initializer();
    this.appName = appName;
    this.basePath = basePath;
    this.port = port;
    this.enviroment = enviroment;
    this.express = express(); 
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(express.json()); 
      
    this.express.use(express.urlencoded({ extended: false }));
 
    this.express.use(cors());
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(rtracer.expressMiddleware({
      requestIdFactory: (req: any) => {
        const uuid = Uuid.random().toString();
        return {
          uniqueId: req.headers['x-request-id'] || uuid,
          trackId: uuid
        };
      }
    }));
    this.express.use(compress());
    setUpSwagger(this.express); 
    const router = Router();
    this.express.use(this.basePath, router);
    registerRoutes(router);
 
    this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    });
 
    this.express.use((req, res, next) => { 
        next(); 
    });
 
    this.express.use(errorHandler);
   
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        log.info(`${this.appName} App is running at ${this.port} in ${this.enviroment} mode`);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      } else {
        return resolve();
      }
    });
  }
}
