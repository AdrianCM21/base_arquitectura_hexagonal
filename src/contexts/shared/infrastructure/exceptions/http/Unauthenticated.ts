import { Response } from "express";
import { HttpException } from "./HttpException";

export class Unauthenticated extends HttpException {

    constructor(message:string = "Usuario no autenticado") { 
        super(401, message);
        Object.setPrototypeOf(this, Unauthenticated.prototype);
    }

    handle(response: Response<any, Record<string, any>>): void {
        response.status(this.statusCode).json({
            error: this.message
        });
    }
}