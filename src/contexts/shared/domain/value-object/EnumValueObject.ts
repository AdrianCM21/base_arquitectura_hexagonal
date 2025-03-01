export abstract class EnumValueObject<T> {
    readonly value: T;

    constructor(value: T, public readonly validValues: T[]) {
        this.value = value;
        this.checkIsInValueRange(value);
    }

    private checkIsInValueRange(value: T) {
        if (!this.validValues.includes(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }

    protected abstract throwErrorForInvalidValue(value: T): void;
}