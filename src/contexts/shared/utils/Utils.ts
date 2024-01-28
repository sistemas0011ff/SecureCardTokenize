export function formatDate(inputDate) {
    return `${inputDate.substring(6, 8)}/${inputDate.substring(4, 6)}/${inputDate.substring(0, 4)}`;
}
/*
export function convertDateFormat(inputDate: string): string | null {
    // Verifica si la fecha tiene el formato 'dd/mm/yyyy'


    console.log("INGRESANDO AL DETALLE BO SDOM : ", inputDate); 
    const isValidFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(inputDate);

    if (isValidFormat) {
        const parts = inputDate.split('/');
        return `${parts[2]}${parts[1]}${parts[0]}`;
    }

    return null;  // Retorna null si la fecha no tiene el formato correcto
}
*/
export function convertDateFormat(inputDate: string): string | null {
    console.log("INGRESANDO AL DETALLE BO SDOM : ", inputDate);

    // Verifica si la fecha tiene el formato 'dd/mm/yyyy'
    if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(inputDate)) {
        const parts = inputDate.split('/');
        return `${parts[2]}${parts[1]}${parts[0]}`; // Convierte a 'yyyymmdd'
    }

    // Verifica si la fecha tiene el formato 'yyyy-mm-dd' o 'yyyy-mm-ddTHH:MM:SS'
    else if (/^\d{4}-\d{2}-\d{2}/.test(inputDate)) {
        const datePart = inputDate.split('T')[0]; // Separa la fecha de la hora si es necesario
        const parts = datePart.split('-');
        return `${parts[0]}${parts[1]}${parts[2]}`; // Convierte a 'yyyymmdd'
    }

    return null;  // Retorna null si la fecha no tiene ninguno de los formatos correctos
}
export function formatDateToOracle(dateString: string): string {
 // Verifica si la fecha tiene el formato 'dd/mm/yyyy'
    if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(dateString)) {
        const parts = dateString.split('/');
        return `${parts[2]}${parts[1]}${parts[0]}`; // Convierte a 'yyyymmdd'
    }

    // Verifica si la fecha tiene el formato 'yyyy-mm-dd' o 'yyyy-mm-ddTHH:MM:SS'
    else if (/^\d{4}-\d{2}-\d{2}/.test(dateString)) {
        const datePart = dateString.split('T')[0]; // Separa la fecha de la hora si es necesario
        const parts = datePart.split('-');
        return `${parts[0]}${parts[1]}${parts[2]}`; // Convierte a 'yyyymmdd'
    }

    return null;  // Retorna null si la fecha no tiene ninguno de los formatos correctos
}
/*
export function formatDateToOracle(dateString: string): string {

    console.log("INGRESANDO AL DETALLE BO SDOM : ", dateString);
    const dateParts = dateString.split('-'); // asumiendo que fecha_trx viene como 'YYYY-MM-DD'
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // convierte a 'DD/MM/YYYY'
}
*/

export function transformSucursal(sucursal: string): string {
    console.log("transformSucursal 288888 pre: ", sucursal);
    switch (+sucursal) {
        case  4200:
            return '25';
        case 577:
            return '27';
        case 2040:
            console.log("transformSucursal 288888");
            return '28';
        case 202:
            return '30';
        default:
            return sucursal.toString();
    }
}