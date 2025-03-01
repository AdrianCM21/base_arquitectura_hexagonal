import { Filter } from "./Filter";

export class Filters {
    readonly filters: Filter[];
    
    constructor(filters: Filter[]) {
        this.filters = filters;
    }

    static fromValues(values: Array<Map<string,string>>) {
        return new Filters(values.map(Filter.fromValues));
    }

    static none() {
        return new Filters([]);
    }
}