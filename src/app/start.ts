import { App } from './App';
import { config } from './config';
import { configureContainer } from './di/index';
import { LoggerPino } from "../app/logger/LoggerPino";

try {
  global.log = LoggerPino.create();
  const appName = 'pry-secure-card-tokenize';
  const basePath = config.get('http.basePath');
  const port = config.get('http.port');
  const enviroment = config.get('env'); 
  configureContainer();
  new App().start(appName, basePath, port.toString(), enviroment);
} catch (e) {
  console.error(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.error({ message: 'uncaughtException', stack: err.stack });
  process.exit(1);
});
