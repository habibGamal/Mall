import Picture from "../models/Picture";
import { MiniProduct } from "./MiniProduct";

export type BranchHasProducts = {
    id: number;
    name: string;
    logo: Picture;
    products: Array<MiniProduct>
}