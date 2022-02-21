import BackendBranch from "./BackendBranch";
import BackendProduct from "./BackendProduct";

export type BackendOrderedItem = {
    id: number;
    count: number;
    branch_id: number;
    order_id: number;
    product_id: number;
    state: string;
    branch: BackendBranch;
    product: BackendProduct;
}