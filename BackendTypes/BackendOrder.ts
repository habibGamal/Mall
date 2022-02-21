import { BackendOrderedItem } from "./BackendOrderedItem";
import BackendProduct from "./BackendProduct";

export type BackendOrder = {
    id: number;
    created_at: string;
    updated_at: string;
    ordered_items: Array<BackendOrderedItem>;
    status: string;
    shipping_cost: number;
    total_cost: number;
    user_id: number;
}