import Form, { TransformTo } from "../packeges/Form";
import imageCompression from 'browser-image-compression'
import { compressPictures } from "../helpers/compressPictures";
import Picture from "../models/Picture";

export default class BranchFormRequest extends Form {
    static createKey = 'branch_form';

    async createSingleBranch(form: FormData, logo: Array<Picture>): Promise<FormData> {
        super.setForm(form);
        if(logo[0]){
            const compressedLogo = await imageCompression(logo[0].file, { maxSizeMB: .05 });
            const structure = [
                this.fromValue(compressedLogo).to(TransformTo.SpecialValue).getAs('logo'),
                this.fromValue(logo[0].positionToJson()).to(TransformTo.SpecialValue).getAs('logo_position'),
            ];
            // build the structure and return it
            return this.build(structure);
        }
        return form;
    }

    async createMultiSameBranches(form: FormData, logo: Array<Picture>, length: number): Promise<FormData> {
        super.setForm(form);
        let conditionalStructure = [];
        if(logo[0]){
            const compressedLogo = await imageCompression(logo[0].file, { maxSizeMB: .05 });
            conditionalStructure = [
                this.fromValue(compressedLogo).to(TransformTo.SpecialValue).getAs('logo'),
                this.fromValue(logo[0].positionToJson()).to(TransformTo.SpecialValue).getAs('logo_position'),
            ]
        }
        const structure = [
            ...conditionalStructure,
            this.from('short_branch_name-*').to(TransformTo.Array).setlength(length).getAs('short_branch_names[]'),
            this.from('address-*').to(TransformTo.Array).setlength(length).getAs('addresses[]'),
        ];
        // build the structure and return it
        return this.build(structure);
    }

    async createMultiDifferentBranches(form: FormData, logo: Array<Picture>, length: number): Promise<FormData> {
        super.setForm(form);
        const compressedPictures = await Promise.all(compressPictures(logo));
        const logos = compressedPictures.map((picture, i) => ({ file: picture, name: logo[i].id }));
        const structure = [
            this.fromArray(logos).to(TransformTo.ArrayFromSpecialArray).getAs('logos[]'),
            this.fromArray(logo.map(picture => picture.positionToJson())).to(TransformTo.ArrayFromSpecialArray).getAs('logos_position[]'),
            this.from('branch_name-*').to(TransformTo.Array).setlength(length).getAs('branch_names[]'),
            this.from('address-*').to(TransformTo.Array).setlength(length).getAs('addresses[]'),
            this.clearList('logo-*').setlength(length),
        ];
        // build the structure and return it
        return this.build(structure);
    }
}