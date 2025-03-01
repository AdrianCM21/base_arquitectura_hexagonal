import { InvalidArgumentError } from "./InvalidArgumentError";
import { StringValueObject } from "./StringValueObject";
import  * as EmailValidator from "email-validator";

export abstract class EmailValueObject extends StringValueObject {

    constructor(readonly email: string) {
        super(email);
        this.ensureIsValidEmail(email);
    }

    private ensureIsValidEmail(email: string) {
        if(!EmailValidator.validate(email)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> no permite el valor <${email}>`);
        }
    }
}