import { Request, Response } from 'express';
import { CardTokenizationRequest } from '../../../contexts/CardTokenization/application/dto/CardTokenizationRequest';
import { ITokenizationService } from '../../../contexts/CardTokenization/application/interfaces/ITokenizationService';
 
export default class TokenizationController { 
    constructor(private tokenizationService: ITokenizationService) {}

    createToken =  async (req: Request, res: Response): Promise<void> => {  
        try {
            const data = new CardTokenizationRequest(
                req.body.email,
                req.body.card_number,
                req.body.cvv,
                req.body.expiration_year,
                req.body.expiration_month
            );
            const token = await this.tokenizationService.tokenizeCard(data);
            res.json({ token }); 
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    };

    getCardData = async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ error: 'Authorization header must be provided with Bearer schema' });
            }
            const token = authHeader.split(' ')[1];
    
            const cardData = await this.tokenizationService.getCardData(token); 
            if (!cardData) {
                return res.status(404).json({ error: 'Token not found or expired' });
            } else {
                return res.json(cardData);
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            } else {
                return res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    };
    
}