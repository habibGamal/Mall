import { Forms } from "../redux/dispatcher";
import productApi from "../api/product";
import Picture from "./Picture";
import Specification from "../types/Specification";
import ProductFormRequest from "../FormRequests/ProductFormRequest";
import { Ref } from "react";
import CategoryType from "../types/CategoryType";
import ProductOption from "../types/ProductOption";
import Chip from "../types/Chip";
import BackendProduct from "../BackendTypes/BackendProduct";
import BackendProductOption from "../BackendTypes/BackendProductOption";

export default class Product {
    id: number;
    name: string;
    offer_price: number;
    price: number;
    picture: Picture;
    category: CategoryType;
    returnable: boolean;
    created_at: string;
    updated_at: string;
    form: HTMLFormElement
    // optional
    brand?: string;
    options?: Array<ProductOption>;
    specifications?: Array<Specification>;
    stock?: number;
    description?: string;
    warranty?: string;
    // encapsulated
    private pictures: string;
    constructor(product: BackendProduct) {
        this.id = product.id;
        this.name = product.name;
        this.offer_price = product.offer_price;
        this.price = product.price;
        this.picture = Picture.getPicture(product.pictures);
        this.pictures = product.pictures;
        this.category = product.category;
        this.returnable = product.returnable;
        this.created_at = product.created_at;
        this.updated_at = product.updated_at;
        this.brand = product.brand;
        this.options = product.options ? Product.unPackingOptions(product.options) : null;
        this.specifications = Product.unPackingSpecifications(product.specifications);
        this.stock = product.stock;
        this.description = product.description;
        this.warranty = product.warranty;
    }
    // edit constructor
    static editable(product: BackendProduct, form: HTMLFormElement) {
        const productInstance = new Product(product);
        productInstance.form = form;
        return productInstance;
    }

    getAllPictures(): Array<Picture> {
        return Picture.getPictures(this.pictures);
    }

    // Edit
    // => initialize values
    async initValues() {
        if(!this.form){
            throw 'This product instance isn\'t editable [form property isn\'t set]'
        }
        const { form } = this;
        const inputs = [...form.elements].map((e: HTMLInputElement) => ({ name: e.name, type: e.type }));
        // => text & number
        inputs.forEach(({ name, type }) => {
            if (type === 'text' || type === 'number') {
                Forms.setInputValue(ProductFormRequest.editKey, name, this[name] || '');
            }
        });
        // => pictures
        const editModePictures = await Picture.getEditModePictures(this.pictures)
        Picture.initPictureToEdit(editModePictures)
        // => chips
        this.options.map(({ name, body }) => {
            const mappingValues = body.map((value, i): Chip => ({ index: i, name: value }))
            Forms.setChipsValue(ProductFormRequest.editKey, name + '_chips', mappingValues);
        });
        // => categories
        Forms.setInputValue(ProductFormRequest.editKey, 'category', this.category.id);
    }
    // utility functions
    static packingSpecifications(spec: string): string {
        // made in:taywan,
        // color:black
        // to => [{ 'made in': 'taywan' }, { 'color': 'black' }]
        // => replace any \n \r (brack line) from the text
        const specifications = spec.replace(/(\r\n|\n|\r)/gm, "")
            // => split the string by (,)
            .split(',')
            // => map over each specification and split it by (:) to get property name and property value
            .map(s => s.split(':'))
            // => set them in the structure 
            .map((a): Specification => ({ name: a[0], value: a[1] }));
        return JSON.stringify(specifications);
    }
    static unPackingSpecifications(spec: string): Array<Specification> {
        // implementation...
        return [{ name: '', value: '' }];
    }
    static unPackingOptions(options: Array<BackendProductOption>): Array<ProductOption> {
        return options.map(({ id, name, body }): ProductOption => ({ id, name, body: JSON.parse(body) }));
    }
    static showScroll(e: React.MouseEvent<HTMLDivElement, MouseEvent>, show: React.MutableRefObject<HTMLDivElement>) {
        // => scrolling between pictures of the product
        const showW = show.current.clientWidth;
        const n = show.current.scrollLeft / (showW + 16);
        const to = (i: number) => show.current.scrollTo({
            left: (showW + 16) * i,
            behavior: 'smooth'
        })
        const x = e.clientX >= show.current.offsetLeft && e.clientX < (show.current.offsetLeft + showW * .5);
        const next = (i: number) => (i - 1 <= n && n < i) ? to(i) : undefined;
        const back = (i: number) => (i < n && n <= i + 1) ? to(i) : undefined;
        if (x) {
            // back
            for (let i = 0; i <= show.current.children.length - 2; i++) {
                back(i);
            }
        } else {
            // next
            for (let i = 1; i <= show.current.children.length - 1; i++) {
                next(i);
            }
        }
    }
}