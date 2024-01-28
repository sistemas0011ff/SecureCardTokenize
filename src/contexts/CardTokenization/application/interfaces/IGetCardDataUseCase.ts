
import { DatosTarjeta } from "../types/DatosTarjeta";

export interface IGetCardDataUseCase {
    execute(token: string): Promise<DatosTarjeta | null>;
}
