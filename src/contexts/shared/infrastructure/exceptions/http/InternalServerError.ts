import { Response } from "express";
import { HttpException } from "./HttpException";

export class InternalServerError extends HttpException {

    constructor(message:string = "Algo salió mal") { 
        super(500, message);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(this.statusCode).json({
            error: this.message
        });
    }
}