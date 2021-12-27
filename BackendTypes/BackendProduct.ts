import CategoryType from "../types/CategoryType";
import BackendProductOption from "./BackendProductOption";


type BackendProduct = {
    id: number,
    name: string,
    offer_price: number,
    price: number,
    pictures: string,
    category: CategoryType,
    returnable: boolean,
    created_at: string,
    updated_at: string,
    // optional
    brand?: string,
    options?: Array<BackendProductOption>,
    specifications?: string,
    stock?: number,
    description?: string,
    warranty?: string,
}

export default BackendProduct;