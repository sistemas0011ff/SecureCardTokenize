import { Router } from 'express';
import { container } from '../di/index'; 
import TokenizationController from '../controllers/tokenization/TokenizationController';
import { RequestLoggerMiddleware } from '../middlewares/RequestLoggerMiddleware';
import { validateReqSchema } from '.';
import tokenizationSchema from '../../contexts/CardTokenization/infrestructure/schemas/tokenizationSchema.json';
import { JWTMiddleware } from '../../contexts/shared/infrastructure/middlewares/JWTMiddleware';

export const register = (router: Router): void => {
    const tokenizationController : TokenizationController = container.resolve('tokenizationController');
    const requestLoggerMiddleware = new RequestLoggerMiddleware();
    /**
     * @swagger
     * openapi: 3.0.0
     * info:
     *   title: API de tokenización de tarjetas
     *   version: 1.0.0
     *   description: Esta es una API de ejemplo para la tokenización de tarjetas de crédito.
     * servers:
     *   - url: http://localhost:3000/
     *     description: Servidor de desarrollo
     * paths:
     *   /tokenize-card:
     *     post:
     *       summary: Crea un token para una tarjeta de crédito
     *       tags: [Tokenización]
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CardTokenizationRequest'
     *       responses:
     *         200:
     *           description: Token de tarjeta de crédito generado con éxito
     *         400:
     *           description: Entrada inválida
     */
    router.post(
        '/tokenize-card',  
        requestLoggerMiddleware.run,
        validateReqSchema(tokenizationSchema),
        tokenizationController.createToken
    );
    /**
     * @swagger
     * paths:
     *   /card-data:
     *     get:
     *       summary: Recupera datos de la tarjeta de crédito para un token dado
     *       tags: [Tokenización]
     *       parameters:
     *         - in: header
     *           name: Authorization
     *           required: true
     *           schema:
     *             type: string
     *           description: Token Bearer para autorización
     *       responses:
     *         200:
     *           description: Datos de la tarjeta de crédito recuperados con éxito
     *         401:
     *           description: No autorizado
     *         404:
     *           description: Token no encontrado o caducado
     * components:
     *   schemas:
     *     CardTokenizationRequest:
     *       type: object
     *       required:
     *         - email
     *         - card_number
     *         - cvv
     *         - expiration_year
     *         - expiration_month
     *       properties:
     *         email:
     *           type: string
     *           format: email
     *         card_number:
     *           type: string
     *         cvv:
     *           type: string
     *         expiration_year:
     *           type: string
     *         expiration_month:
     *           type: string
     *     CardDataResponse:
     *       type: object
     *       properties:
     *         card_number:
     *           type: string
     *         expiration_year:
     *           type: string
     *         expiration_month:
     *           type: string
     *         email:
     *           type: string
     *           format: email
     */
    router.get(
        '/card-data',  
        requestLoggerMiddleware.run,
        JWTMiddleware,
        tokenizationController.getCardData
    );
};