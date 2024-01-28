import { ICommandHandler } from '../../../../contexts/shared/cqrs/ICommandHandler';
import { TokenizeCardCommand } from '../commands/TokenizeCardCommand';
import { ITokenService } from '../../domain/services/ITokenService';
import { ICommandResult } from '../../../../contexts/shared/cqrs/ICommandResult';
import { ConfirmationResponse } from '../../../../contexts/shared/application/response/Confirmation';
import { TokenizeCardResponseDTO } from '../dto/TokenizeCardResponseDTO';

export class TokenizeCardCommandHandler implements ICommandHandler<TokenizeCardCommand, ICommandResult<ConfirmationResponse, TokenizeCardResponseDTO>> {
    constructor(private tokenService: ITokenService) {}

    async handle(command: TokenizeCardCommand): Promise<ICommandResult<ConfirmationResponse, TokenizeCardResponseDTO>> {
        const { cardTokenizationRequest } = command;

        try { 
            const token = await this.tokenService.generarToken({
                cardNumber: cardTokenizationRequest.card_number,
                expirationDate: `${cardTokenizationRequest.expiration_month}/${cardTokenizationRequest.expiration_year}`,
                cvv: cardTokenizationRequest.cvv,
                email: cardTokenizationRequest.email
            });
 
            const responseDTO: TokenizeCardResponseDTO = {
                message: "Token generado con éxito",
                token: token 
            };
 
            return {
                result: new ConfirmationResponse(true, "0", "Token generado con éxito", token),
                value: responseDTO
            };
        } catch (error) { 
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al generar el token';
             
            const responseDTO: TokenizeCardResponseDTO = {
                message: errorMessage
            }; 
            return {
                result: new ConfirmationResponse(false, "1", errorMessage, ""),
                value: responseDTO
            };
        }
    }
}
