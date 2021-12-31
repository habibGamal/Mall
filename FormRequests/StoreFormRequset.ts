import Form, { TransformTo } from "../packeges/Form";


export default class StoreFormRequest extends Form {
    static createKey = 'create_store_form';
    static editKey = 'edit_store_form';

    create(form: FormData): FormData {
        super.setForm(form);
        const structure = [
            this.from('work_hours').to(TransformTo.AssosiativeArray).getAs('work_hours[from,from-per,to,to-per]'),
            this.from('holidays').to(TransformTo.ArrayWithSameName).getAs('holidays[]'),
        ];
        // build the structure and return it
        return this.build(structure);
    }
}