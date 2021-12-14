import { compressPictures } from "../helpers/compressPictures";
import { Forms } from "../redux/dispatcher";
import productApi from "../api/product";
import Picture from "./Picture";

export default class Product {
    static editKey = 'edit_product_form';
    constructor(product = null, form) {
        this.product = product;
        this.form = form;
        this.editKey = Product.editKey;
    }
    // Create
    // => build the structure required to create new product
    static async createProductStructure(pictures,form) {
        const compressedPictures = await Promise.all(compressPictures(pictures));
        return [
            ['colors_option', { from: 'colors_option', type: 'chips' }],
            ['sizes_option', { from: 'sizes_option', type: 'chips' }],
            ['specifications', { from: Product.packingSpecifications(form.get('specifications')), type: 'free-json' }],
            ['warranty', { from: 'warranty_time[+]warranty_date', type: 'collect', options: { separator: ' ' } }],
            ['pictures[]', { from: compressedPictures, type: 'free-array', options: { filename: true } }],
            ['pictures_position[]', { from: pictures.map(picture => picture.positionToJson()), type: 'free-array' }]
        ]
    }
    static packingSpecifications(spec) {
        /*
         it takes ===>
            made in:taywan
            color:black
         return ===>
            [
                {'made in':'taywan'},
                {'color':'black'}
            ]
         */
        // => replace any \n \r (brack line) from the text
        return spec.replace(/(\r\n|\n|\r)/gm, "")
            // => split the string by (,)
            .split(',')
            // => map over each specification and split it by (:) to get property name and property value
            .map(s => s.split(':'))
            // => set them in the structure 
            .map(a => ({ [a[0]]: a[1] }))
    }
    // Show
    // => scrolling between pictures of the product
    showScroll(e, show) {
        const showW = show.current.clientWidth;
        const n = show.current.scrollLeft / (showW + 16);
        const to = (i) => show.current.scrollTo({
            left: (showW + 16) * i,
            behavior: 'smooth'
        })
        const x = e.clientX >= show.current.offsetLeft && e.clientX < (show.current.offsetLeft + showW * .5);
        const next = (i) => (i - 1 <= n && n < i) ? to(i) : undefined;
        const back = (i) => (i < n && n <= i + 1) ? to(i) : undefined;
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
    // Edit
    // => initialize values
    async initValues() {
        const { product, form: { current: form }, editKey } = this;
        const inputs = [...form.elements].map(e => ({ name: e.name, type: e.type }));
        // => text & number
        inputs.forEach(({ name, type }) => {
            if (type === 'text' || type === 'number') {
                Forms.setInputValue(editKey, name, product[name] || '');
            }
        });
        // => pictures
        const rowPaths = Picture.rowPaths(product.pictures);
        const { data: bases } = await productApi.getRowPicture(rowPaths);
        const getEditModePictures = Picture.getEditModePictures(bases, product.pictures)
        Picture.initPictureToEdit(getEditModePictures)
        // => chips
        product.options.map(({ name, body }) => {
            const values = JSON.parse(body);
            const mappingValues = values.map((value, i) => ({ index: i, name: value }))
            Forms.setChipsValue(editKey, name + '_chips', mappingValues);
        });
        // => categories
        Forms.setInputValue(editKey, 'category', product.category.id);
    }
}