import { InvalidArgumentError } from "./InvalidArgumentError";
import { StringValueObject } from "./StringValueObject";

export abstract class Ruc extends StringValueObject {

    constructor(readonly ruc: string) {
        super(ruc);
        this.ensureIsValidRuc(ruc);
    }

    private ensureIsValidRuc(ruc: string) {
        if(!ruc.match(new RegExp(/^\d{1,8}-\d$/)))
            throw new InvalidArgumentError(`<${this.constructor.name}> no permite el valor <${ruc}>`);
    }

    public getCi() {
        return this.value.split("-")[0];
    }

    public getDV() {
        return this.value.split("-")[1];
    }

}