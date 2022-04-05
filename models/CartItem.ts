import BackendCartItem from "../BackendTypes/BackendCartItem";
import Picture from "./Picture";

export default class CartItem {
    id: number;
    name: string;
    picture: Picture;
    quantity: number;
    price: number;
    static formKey = 'MiniCart';
    constructor(item: BackendCartItem) {
        this.id = item.id
        this.name = item.name
        this.quantity = item.pivot.product_count
        this.price = item.offer_price
        this.picture = Picture.getPicture(item.pictures);
    }
}