import { BackendOrderedItem } from "../BackendTypes/BackendOrderedItem";
import Branch from "./Branch"
import Product from "./Product"

export default class OrderedItem {
    id: number;
    branch: Branch;
    count: number;
    branch_id: number;
    order_id: number;
    product_id: number;
    product: Product;
    state: string;
    constructor(item: BackendOrderedItem) {
        this.id = item.id;
        this.count = item.count;
        this.state = item.state;
        this.branch_id = item.branch_id;
        this.order_id = item.order_id;
        this.product_id = item.product_id;
        this.product = new Product(item.product);
        if (item.branch)
            this.branch = new Branch(item.branch);
    }
}