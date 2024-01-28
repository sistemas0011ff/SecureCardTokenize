// export interface IValidateOutput {
//     isValid: boolean;
//     mensajeError: string;
// }
export interface IValidateOutput<R,Q> {
    isValid: R;
    mensajeError: Q;
}