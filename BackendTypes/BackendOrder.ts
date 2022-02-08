import BackendProduct from "./BackendProduct";

export type BackendOrder = {
    id: number;
    created_at: string;
    updated_at: string;
    products: Array<BackendProduct>;
    status: string;
    shipping_cost: number;
    total_cost: number;
    user_id: 2;
}