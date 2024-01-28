import { Server } from './server';

export class App {
  server?: Server;

  async start(appName: string, basePath: string, port: string, enviroment: string) {
    this.server = new Server(appName, basePath, port, enviroment);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
