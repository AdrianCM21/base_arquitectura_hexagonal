import { EnumValueObject } from "../value-object/EnumValueObject";
import { InvalidArgumentError } from "../value-object/InvalidArgumentError";

export enum Operator {
    EQUAL = "=",
    DISTINCT = "!=",
    GT = ">",
    LT = "<",
    GEQ = ">=",
    LEQ = "<=",
    CONTAINS = 'CONTAINS',
    NOT_CONTAINS = 'NOT_CONTAINS'
}

export class FilterOperator extends EnumValueObject<Operator> {

    constructor(value: Operator) {
        super(value, Object.values(Operator));
    }

    static fromValue(value: string) {
        for(const operatorValue of Object.values(Operator)) {
            if(value === operatorValue.toString()) {
                return new FilterOperator(operatorValue);
            }
        }
        throw new InvalidArgumentError(`El operador <${value}> no es válido`); 
    }
    protected throwErrorForInvalidValue(value: Operator): void {
        throw new InvalidArgumentError(`El operador <${value}> no es válido`);
    }

    static equal() {
        return this.fromValue(Operator.EQUAL);
    }
}
