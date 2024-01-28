import createHttpError from 'http-errors';

export class DatabaseConnectionError extends createHttpError.InternalServerError {
    public readonly errorCode: string;
    private _name: string;

    constructor(message: string = 'Error de conexión con la base de datos', errorCode: string = "3") {
        super(message);
        this.errorCode = errorCode;
        this._name = 'DatabaseConnectionError';
    }

    get name(): string {
        return this._name;
    }

    get message(): string {
        return super.message;
    }
}
