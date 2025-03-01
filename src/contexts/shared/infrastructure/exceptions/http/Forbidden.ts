import { Response } from "express";
import { HttpException } from "./HttpException";

export class Forbidden extends HttpException {

    constructor(message:string = "No tiene permisos para realizar esta operación") { 
        super(403, message);
        Object.setPrototypeOf(this, Forbidden.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(this.statusCode).json({
            error: this.message
        });
    }
}