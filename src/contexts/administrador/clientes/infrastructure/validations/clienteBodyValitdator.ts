import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ValidationError } from "../../../../shared/infrastructure/exceptions/http/ValidationError";

export const clienteBodyValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            nombre: Joi.string().required().min(3).max(255).messages({
                'any.required': 'El nombre es requerido',
                'string.min': 'El nombre es muy corto',
                'string.max': 'El nombre es muy largo'
            }),
            email: Joi.string().required().email().max(255).messages({
                'any.required': 'El email es requerido',
                'any.max': 'El email es muy largo',
                'string.email': 'El email no tiene el formato correcto'
            }),
            ruc: Joi.string().required().regex(new RegExp(/^\d{1,8}-\d$/)).messages({
                'string.pattern.base': 'El ruc debe tener el formato correcto "1234567-8"',
                'any.required': 'El ruc es requerido',
            }),
            tipo: Joi.string().required().valid('fisica', 'juridica').messages({
                'any.required': 'El tipo de cliente es requerido',
                'any.only': 'El tipo de cliente debe estar entre los valores "fisica", "juridica"'
            }),
        });
    
        await schema.validateAsync(req.body);
        return next();
    } catch (e) {
        if(e instanceof Joi.ValidationError)
            return next(new ValidationError("Error de Validación", e.details.map(detail => detail.message)));
        return next(e);
    }

    
};