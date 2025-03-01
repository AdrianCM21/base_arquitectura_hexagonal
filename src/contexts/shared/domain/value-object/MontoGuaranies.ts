import { NumberValueObject } from "./NumberValueObject";

export class MontoGuaranies extends NumberValueObject {
    readonly value:number;

    constructor(value:number){
        super(value);
        this.value = Math.round(value);
    }

    formatted() {
        // Agrega separador de miles
        return this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}