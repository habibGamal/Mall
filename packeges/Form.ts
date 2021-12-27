export enum TransformTo {
    Array,
    ArrayWithSameName,
    Chips,
    AssosiativeArray,
    Collection,
    SpecialValue,
    ArrayFromSpecialArray,
    Files,
}

class FormField {
    public name: string;
    public transform_to: TransformTo;
    public shape: string;
    public length: number;
    public from_array: Array<any>;
    public special_value: any;
    public separator: string;
    public file_has_custom_name: boolean;

    fromArray(array: Array<any>): FormField {
        const formField = new FormField();
        formField.from_array = array;
        return formField;
    }

    fromValue(special_value: any): FormField {
        const formField = new FormField();
        formField.special_value = special_value;
        return formField;
    }

    from(name: string): FormField {
        const formField = new FormField();
        formField.name = name;
        return formField;
    }

    to(transformTo: TransformTo): FormField {
        this.transform_to = transformTo;
        return this;
    }

    getAs(shape: string): FormField {
        this.shape = shape;
        return this;
    }

    setSeparator(separator: string): FormField {
        this.separator = separator;
        return this;
    }
    setlength(length: number): FormField {
        this.length = length;
        return this;
    }

    fileHasCustomName(bool: boolean): FormField {
        this.file_has_custom_name = bool;
        return this;
    }


}

export default abstract class Form extends FormField {
    protected form: FormData;
    constructor() {
        super();
    }

    setForm(form: FormData){
        this.form = form;
    }

    build(formFields: Array<FormField>) {
        formFields.forEach(
            formField => this.get(formField)
        )
        return this.form;
    }

    get(formField: FormField) {
        const { form } = this;
        const { name: from, shape } = formField;
        switch (formField.transform_to) {
            case TransformTo.AssosiativeArray:
                const [name, keys] = shape.match(/([^\[\]])+/g);
                const arrayKeys: Array<string> = keys.split(',');
                arrayKeys.forEach((key, i) => {
                    form.append(`${name}[${key}]`, form.getAll(from)[i]);
                });
                form.delete(from);
                return form;

            case TransformTo.Array:
                for (let i = 1; i <= formField.length; i++) {
                    form.append(shape, form.get(from.replace('*', i.toString())));
                    form.delete(from.replace('*', i.toString()));
                }
                return form;

            case TransformTo.Chips:
                const chips = JSON.stringify(([...document.querySelectorAll(`[data-name="${from}"]`)] as Array<HTMLElement>).map(chip => chip.dataset.value));
                form.set(shape, chips);
                return form;

            case TransformTo.Collection:
                // => from is 'name1[+]name2[+]...'
                const inputs = from.split('[+]');
                const values = inputs.map(input => {
                    const buffer = form.get(input);
                    form.delete(input);
                    return buffer;
                });
                form.append(shape, values.join(formField.separator));
                return form;

            case TransformTo.SpecialValue:
                // => special_value can be a file  , json , any dynamic value
                form.set(shape, formField.special_value);
                return form;

            case TransformTo.ArrayWithSameName:
                // => make holidays[] from input fields holidays
                form.getAll(from).forEach(value => form.append(shape, value));
                return form;

            case TransformTo.Files:
                // => 
                if (formField.file_has_custom_name) {
                    formField.from_array.forEach(element => {
                        form.append(shape, element.file, element.name);
                    });
                } else {
                    formField.from_array.forEach(file => {
                        form.append(shape, file, file.name);
                    });
                }
                return form;
            case TransformTo.ArrayFromSpecialArray:
                // => make positions[] from dynamic array position
                formField.from_array.forEach(value => {
                    form.append(shape, value);
                });
                return form;
            default:
                return;
        }
    }
}

// experiment

// let form = new Form(someform);
// //
// form.append('work_hours[from]', form.getAll('work_hours')[0]);
// //
// for (let i = 1; i <= length; i++) {
//     form.append('short_branch_names[]', form.get(`short_branch_name-${i}`));
//     form.delete(`short_branch_name-${i}`);
// }
// //
// form.set('specifications', JSON.stringify(splitSpecifications(form.get('specifications'))));
// //
// form.get('warranty_time') ? form.set('warranty', form.get('warranty_time') + ' ' + form.get('warranty_date')) : undefined;
// //
// const color_chips = JSON.stringify([...document.querySelectorAll('[data-name="colors_option"]')].map(chip => chip.dataset.value));
// form.set('colors_option', color_chips);
// //
// form.append('logo_position', JSON.stringify(logo[0].position));
// //
// compressedPictures.forEach((picture, i) => {
//     form.append('logos[]', picture, logo[i].pictureId);
//     form.append('logos_position[]', JSON.stringify(logo[i].position));
// });
// let str = new Map([
//     // ['work_hours[from,from-per,to,to-per]', { from: 'work_hours', type: 'a-array' }],
//     // ['short_branch_names[]', { from: 'short_branch_name-*', type: 'array', length: 3 }],// where 3 is the length of the array
    // // ['colors_option', { from: '[data-name="colors_option"]', type: 'chips' }],
//     // ['warranty_time', { from: 'warranty_time[+]warrantyDate', type: 'collect', options: { separator: ' ' } }],
//     // ['logo_position', { from: logo[0].position, type: 'free-json' }]
//     // ['logos[]', { from: Pictures, type: 'free-array', options: { filename: true, } }]
// ])
// form.structure(str)