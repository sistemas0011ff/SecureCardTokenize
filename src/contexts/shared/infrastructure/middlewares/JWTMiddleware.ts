// src/contexts/shared/infrastructure/middlewares/JWTMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../../app/config';

export const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Authorization header is missing or not in Bearer schema');
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Token is required');
    }
    const secretKey = config.get('jwt.secretKey');
    // const secretKey = config.jwt.secretKey; // Asegúrate de que la configuración esté bien referenciada aquí
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    
    // Almacena el payload del token en locals para el siguiente middleware o controlador
    res.locals.token = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};

// Luego, en tu controlador o en el siguiente middleware, puedes acceder al payload del token así:
// const tokenPayload = res.locals.token;


/*import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../../../app/config';
 
export const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Asegúrate de que 'authorization' es el header correcto para tu caso
    if (!token) {
      return res.status(401).send('Authorization token is required');
    }
    const secretKey = config.get('jwt.secretKey'); // Utiliza tu lógica de configuración aquí
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    
    req.token = decoded; // Adjunta el payload del token al objeto Request
    next();
  } catch (error) {
    res.status(401).send('Invalid or expired token');
  }
};
*/