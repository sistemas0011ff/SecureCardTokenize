
import { IQueryBus } from '../../../../contexts/shared/cqrs/IQueryBus';
import { IGetCardDataUseCase } from '../interfaces/IGetCardDataUseCase'; 
import { GetCardDataQuery } from '../queries/GetCardDataQuery';
import { DatosTarjeta } from '../types/DatosTarjeta';

export class GetCardDataUseCase implements IGetCardDataUseCase {
    constructor(private queryBus: IQueryBus) {}
    async execute(token: string): Promise<DatosTarjeta | null> {
        return this.queryBus.execute<GetCardDataQuery, DatosTarjeta | null>(new GetCardDataQuery(token));
    }
}
