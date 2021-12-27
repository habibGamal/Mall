import { Ref } from "react";
import { compressPictures } from "../helpers/compressPictures";
import Picture from "../models/Picture";
import Product from "../models/Product";
import Form, { TransformTo } from "../packeges/Form";
import ResizedPicture from "../types/ResizedPicture";

export default class ProductFormRequest extends Form {
    static createKey = 'create_product_form';
    static editKey = 'edit_product_form';

    async create(form: FormData, pictures: Array<Picture>): Promise<FormData> {
        super.setForm(form);
        const compressedPictures: Array<any> = await Promise.all(compressPictures(pictures));
        const structure = [
            this.from('colors_option').to(TransformTo.Chips).getAs('colors_option'),
            this.from('sizes_option').to(TransformTo.Chips).getAs('sizes_option'),
            this.fromValue(Product.packingSpecifications((this.form.get('specifications') as string))).to(TransformTo.SpecialValue).getAs('specifications'),
            this.from('warranty_time[+]warranty_date').to(TransformTo.Collection).getAs('warranty'),
            this.fromArray(compressedPictures).to(TransformTo.ArrayFromSpecialArray).getAs('pictures[]'),
            this.fromArray(pictures.map(picture => picture.positionToJson())).to(TransformTo.ArrayFromSpecialArray).getAs('pictures_position[]'),
        ];
        // clear unwanted fields
        this.form.delete('picture');
        // build the structure and return it
        return this.build(structure);
    }

    async edit(form: FormData, pictures: Array<Picture>, deletedPictures: Array<string>, resizedPictures: ResizedPicture): Promise<FormData> {
        super.setForm(form);
        const newPictures = pictures.filter(picture => !picture.editMode);
        const compressedPictures: Array<any> = await Promise.all(compressPictures(newPictures));
        const structure = [
            this.from('colors_option').to(TransformTo.Chips).getAs('colors_option'),
            this.from('sizes_option').to(TransformTo.Chips).getAs('sizes_option'),
            this.fromValue(Product.packingSpecifications((this.form.get('specifications') as string))).to(TransformTo.SpecialValue).getAs('specifications'),
            this.from('warranty_time[+]warranty_date').to(TransformTo.Collection).getAs('warranty'),
            this.fromArray(compressedPictures).to(TransformTo.ArrayFromSpecialArray).getAs('pictures[]'),
            this.fromArray(pictures.map(picture => picture.positionToJson())).to(TransformTo.ArrayFromSpecialArray).getAs('pictures_position[]'),
        ];
        console.log(deletedPictures);

        // append new fields
        if (deletedPictures) {
            this.form.append('deletePictures', JSON.stringify(deletedPictures));
        }
        // append new fields
        if (resizedPictures) {
            this.form.append('resizedPictures', JSON.stringify(resizedPictures));
        }
        // clear unwanted fields
        this.form.delete('picture');
        // build the structure and return it
        return this.build(structure);
    }
}