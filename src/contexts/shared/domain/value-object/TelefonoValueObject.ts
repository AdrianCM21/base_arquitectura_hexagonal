import { InvalidArgumentError } from "./InvalidArgumentError";
import { ValueObject } from "./ValueObject";

export class TelefonoValueObject extends ValueObject<string> {
  private static readonly telefonoRegex = /^(?:\+?[0-9]{1,3})?[-\s]?([0-9]{10,15})$/;


  constructor(value: string) {
    if (!TelefonoValueObject.telefonoRegex.test(value)) {
      throw new InvalidArgumentError(`<${value}> no es una ruta válida.`);
    }
    super(value);
  }


  public getTelefono(): string {
    return this.value;
  }
}
