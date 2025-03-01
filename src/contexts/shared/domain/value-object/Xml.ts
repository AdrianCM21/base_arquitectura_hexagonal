import { DOMParser } from "xmldom";
import { InvalidArgumentError } from "./InvalidArgumentError";
import { StringValueObject } from "./StringValueObject";

export class Xml extends StringValueObject {
    readonly value: string;
    constructor(value:string) {
        super(value);
        this.checkIsValidXML(value);
        this.value = value;
    }

    private checkIsValidXML(value:string) {
        const parser = new DOMParser({
            errorHandler: {
                error: () => {
                    throw new InvalidArgumentError(`XML no válido: ${value}`);
                }, 
                fatalError: () => {
                    throw new InvalidArgumentError(`XML no válido: ${value}`);
                }
            }
        });
        parser.parseFromString(value, "application/xml");
    }
}