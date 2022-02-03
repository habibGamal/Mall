import Picture from "../models/Picture";

export type MiniProduct = {
    id: number;
    name: string;
    offer_price: number;
    price: number;
    picture: Picture;
}