import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';  

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de tokenización de tarjetas',
      version: '1.0.0',
      description: 'Esta es una API de ejemplo para la tokenización de tarjetas de crédito.',
    },
  },
  apis: ['./src/app/routes/**/*.ts'], 
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export function setUpSwagger(app: Application): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}