import { BackendOrder } from "../BackendTypes/BackendOrder";
import OrderedItem from "./OrderedItem";
import Product from "./Product";

export default class Order {
    id: number;
    user_id: number;
    items: Array<OrderedItem>;
    status: string;
    shipping_cost: number;
    total_cost: number;
    created_at: string;
    updated_at: string;
    constructor(order: BackendOrder) {
        this.id = order.id;
        this.user_id = order.user_id;
        this.items = order.ordered_items.map(item => new OrderedItem(item));
        this.status = order.status;
        this.shipping_cost = order.shipping_cost;
        this.total_cost = order.total_cost;
        if (order.created_at)
            this.created_at = this.getNormalDate(order.created_at);
        this.updated_at = order.updated_at;
    }
    getNormalDate(date: string) {
        return date.replaceAll('-', '/').slice(0, 10);
    }

}