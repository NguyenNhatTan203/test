export class AppError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        // this.errorCode = errorCode;
    }
}
