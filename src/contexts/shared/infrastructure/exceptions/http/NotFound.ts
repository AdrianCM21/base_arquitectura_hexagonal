import { Response } from "express";
import { HttpException } from "./HttpException";

export class NotFound extends HttpException {

    constructor(message:string = "No se encontró el recurso") { 
        super(404, message);
        Object.setPrototypeOf(this, NotFound.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(this.statusCode).json({
            error: this.message
        });
    }
}