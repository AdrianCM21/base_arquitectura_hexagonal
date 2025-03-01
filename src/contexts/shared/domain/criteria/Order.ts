import { OrderBy } from "./OrderBy";
import { OrderType } from "./OrderType";

export class Order {
    readonly orderBy: OrderBy;
    readonly orderType: OrderType;

    constructor(orderBy: OrderBy, orderType: OrderType) {
        this.orderBy = orderBy;
        this.orderType = orderType;
    }
}