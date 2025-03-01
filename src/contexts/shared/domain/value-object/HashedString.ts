import { Hasher } from "../services/Hasher";
import { StringValueObject } from "./StringValueObject";

export class HashedString extends StringValueObject {
    readonly value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }

    public static fromPlainText(value: string, hasher: Hasher): HashedString {
        const hashed = hasher.hash(value);
        return new HashedString(hashed);
    }

    public compare(other: string, hasher: Hasher) {
        return hasher.compare(this.value, other);
    }
}