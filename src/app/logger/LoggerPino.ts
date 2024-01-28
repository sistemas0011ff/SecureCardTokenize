import pino, { Logger } from 'pino';
import rtracer from 'cls-rtracer';
import * as packageJSON from '../../../package.json';
import { BaseLogger } from './BaseLogger';

type Tracker = {
  uniqueId: string;
  trackId: string;
};

export class LoggerPino implements BaseLogger {
  private log: Logger;

  private constructor() {
    try {
      const pinoLogger = pino({
        level: process.env.LOG_LEVEL || 'info',
        base: null,
        formatters: {
          log(object) {
            return {
              uniqueId: (rtracer.id() as Tracker)?.uniqueId || rtracer.id(),
              trackId: (rtracer.id() as Tracker)?.trackId || rtracer.id(),
              message: object
            };
          }
        }
      });
      this.log = pinoLogger.child({
        system: 'Culqi',
        country: 'PE',
        service: packageJSON.name,
        environment: process.env.NODE_ENV,
        appVersion: packageJSON.version
      });
    } catch (error) {
      console.error('Error during Pino logger creation:', error);
    }
  }

  static create(): LoggerPino {
    return new LoggerPino();
  }

  debug(params: any): void {
    this.log.debug(params);
  }

  info(params: any): void {
    this.log.info(params);
  }

  warn(params: any): void {
    this.log.warn(params);
  }

  error(params: any): void {
    this.log.error(params);
  }

  fatal(params: any): void {
    this.log.fatal(params);
  }
}
