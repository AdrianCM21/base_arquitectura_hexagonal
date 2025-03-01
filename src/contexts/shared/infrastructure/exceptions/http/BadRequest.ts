import { Response } from "express";
import { HttpException } from "./HttpException";

export class BadRequest extends HttpException {

    constructor(message:string = "Error en el formato de la consulta") { 
        super(400, message);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(this.statusCode).json({
            error: this.message
        });
    }
}