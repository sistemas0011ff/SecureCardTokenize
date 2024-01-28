import { IRequestPrograma } from "./interfaces/IPrograma";
import { IValidateInput } from "./interfaces/IValidateInput";
import { IValidateOutput } from "./interfaces/IValidateOutput";
import { IValidateUseCase } from "./interfaces/IValidateUseCase";

export abstract class BaseValidateUseCase<T extends IRequestPrograma> implements
    IValidateUseCase<IValidateInput<T>, IValidateOutput<boolean, string>
    >
{
    async execute(input: IValidateInput<T>): Promise<IValidateOutput<boolean, string>> {
        try {
            // Validación genérica del campo "programa"
            if (!input || !input.input) {
                throw new Error("El input o input.input es null o undefined");
            }

            if (input.input.programa) {
                this.validatePrograma(input.input.programa);
            } else {
                throw new Error('Error: Falta el elemento "programa" o no es un arreglo válido.');
            }

            // Delegar la validación específica a las subclases
            await this.validateDatos(input.input);

            return { isValid: true, mensajeError: "" };
        } catch (error: any) {
            return { isValid: false, mensajeError: error?.message };
        }
    }

    // Método para ser sobrescrito por subclases para validar campos específicos
    protected abstract validateDatos(input: T): Promise<void>;

    protected validatePrograma(programa: any): void {
        if (!programa || typeof programa !== 'object') {
            throw new Error('Error: Falta el elemento "programa" o no es un objeto.');
        }
        // Aquí puedes poner los campos que son necesarios en todos los "programa"
        const requiredProgramaFields = ['canal', 'fecha_hora_rq', 'sucursal_rq', 'nro_caja_rq', 'nro_transaccion_rq', 'vendedor_rq', 'version', 'timeout'];
        for (const field of requiredProgramaFields) {
            if (!programa[field] || typeof programa[field] !== 'string' || !programa[field].trim()) {
                throw new Error(`Error: "${field}" en "programa" está faltando, no es una cadena de texto válida o es vacía.`);
            }
        }
    }

}