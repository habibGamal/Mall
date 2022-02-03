import { BackendFullCategory } from "../BackendTypes/BackendFullCategory";
import { BranchHasProducts } from "../types/BranchHasProducts";
import Picture from "./Picture";

export default class FullCategory {
    id: number;
    name: string;
    branches: Array<BranchHasProducts>;
    constructor(category: BackendFullCategory) {
        this.id = category.id;
        this.name = category.name;
        this.branches = this.arrangeProducts(category);
    }
    arrangeProducts(category: BackendFullCategory): Array<BranchHasProducts> {
        let productsByBranches: any = {};
        category.products.map(product => {
            const currentBranch = product.branches[0];
            if (currentBranch?.id) {
                if (productsByBranches[currentBranch.id]) {
                    productsByBranches[currentBranch.id].products.push({
                        id: product.id,
                        name: product.name,
                        offer_price: product.offer_price,
                        picture: Picture.getPicture(product.pictures),
                        price: product.price,
                    });
                } else {
                    productsByBranches[currentBranch.id] = {
                        id: currentBranch.id,
                        name: currentBranch.name,
                        logo: Picture.getPicture(currentBranch.logo),
                        products: [{
                            id: product.id,
                            name: product.name,
                            offer_price: product.offer_price,
                            picture: Picture.getPicture(product.pictures),
                            price: product.price,
                        }]
                    };
                }
            } else {
                console.log('this product haven\'t branch');
            }
        })
        return Object.values(productsByBranches);
    }
}