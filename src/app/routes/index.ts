import * as glob from 'glob';
import { AnySchema } from 'ajv';
import httpStatus from 'http-status'; //
import { NextFunction, Router, Request, Response } from 'express';
import Validate from '../ajv/Validate';

function register(routePath: string, router: Router) {
  // console.log(`Intentando cargar y registrar ruta desde: ${routePath}`);
  try {
    const route = require(routePath);
    if (typeof route.register === 'function') {
      route.register(router);
    } else {
      console.error(`Error: la función 'register' no se encontró en ${routePath}`);
    }
  } catch (error) {
    console.error(`Error al cargar la ruta desde ${routePath}:`, error);
  }
}

export function registerRoutes(router: Router) {
  const dirname = process.platform === 'win32' ? __dirname.replace(/\\/g, '/') : __dirname;
  // console.log(`Directorio actual: ${dirname}`);
  const routes = glob.sync(dirname + '/**/*.route.*');
  // console.log(`Encontradas ${routes.length} rutas para registrar`);

  routes.forEach(routePath => {
    // console.log(`Procesando ruta: ${routePath}`);
    register(routePath, router);
  });
}

export function validateReqSchema(schema: AnySchema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const validate = new Validate();
    if (req.method === 'GET') {
      const { params, query } = req;
      validate.run(schema, { ...params, ...query });
    } else {
      const { body, params } = req;
      validate.run(schema, { ...body, ...params });
    }

    if (validate.result) {
      return next();
    }
    const response = {
      success: false,
      errors: validate.errorMessage,
    };
    log.warn({
      action: 'response',
      status: httpStatus.BAD_REQUEST,
      content: response
    });
    return res.status(httpStatus.BAD_REQUEST).send(response);
  };
}
