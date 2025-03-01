import path from "path";
import { StringValueObject } from "./StringValueObject";
import { InvalidArgumentError } from "./InvalidArgumentError";

export class Path extends StringValueObject {
    readonly value: string;

    constructor(value:string) {
        super(value);
        this.checkIsPath(value);
    }

    private checkIsPath(value: string) {
        if(path.basename(value) === value)
            throw new InvalidArgumentError(`<${value}> no es una ruta válida.`);
    }
}