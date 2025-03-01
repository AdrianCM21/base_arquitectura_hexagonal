import { Response } from "express";
import { HttpException } from "./HttpException";

export class ValidationError extends HttpException {

    private errorList;

    constructor(message:string = "Errores de validación", errorList: any) { 
        super(400, message);
        this.errorList = errorList;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(400).json({
            error: this.message,
            type: 'validation',
            errors: this.errorList
        });
    }
}