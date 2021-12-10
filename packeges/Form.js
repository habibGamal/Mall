
export default class Form {
    constructor(form) {
        this.form = new FormData(form);
    }
    structure(stc) {
        const { form } = this;
        for (const [key, { from, type, length, options: { condition, filename, separator, customName } = {} }] of stc) {
            if (type === 'a-array') {
                // assosiative array => name[keys] from names ex: 'work_hours[from,from-per,to,to-per]' from 'work_hours'
                // names means : we have more than input with the same name and 
                // we can get all thier values as array and assign each index to a specific key of associative
                let [name, keys] = key.match(/([^\[\]])+/g);
                keys = keys.split(',');
                keys.forEach((key, i) => {
                    form.append(`${name}[${key}]`, form.getAll(from)[i]);
                    console.log(form.get(`${name}[${key}]`));
                });
                form.delete(from);
            }
            if (type === 'array') {
                for (let i = 1; i <= length; i++) {
                    form.append(key, form.get(from.replace('*', i)));
                    form.delete(from.replace('*', i));
                }
            }
            if (type === 'chips') {
                const chips = JSON.stringify([...document.querySelectorAll(`[data-name="${from}"]`)].map(chip => chip.dataset.value));
                form.set(key, chips);
            }
            if (type === 'collect') {
                // => from is 'name1[+]name2[+]...'
                const inputs = from.split('[+]');
                const values = inputs.map(input => {
                    const buffer = form.get(input);
                    form.delete(input);
                    return buffer;
                });
                form.append(key, values.join(separator));
            }
            if (type === 'free') {
                // => from can be any valid json value
                form.set(key, from);
            }
            if (type === 'free-json') {
                // => from can be any valid json value
                form.set(key, JSON.stringify(from));
            }
            if (type === 'to-array') {
                form.getAll(from).forEach(element => form.append(key, element))
            }
            if (type === 'free-array') {
                // => from must be an array
                if (customName) {
                    from.forEach(element => {
                        form.append(key, element.file, element.name);
                    });
                } else if (filename) {
                    from.forEach(file => {
                        form.append(key, file, file.name);
                    });
                } else {
                    from.forEach(element => {
                        form.append(key, element);
                    });
                }
            }
            if(type === 'clear') {
                // => key must be name-*
                const l = length ?? 1;
                for (let i = 1; i <= l; i++) {
                    form.delete(key.replace('*', i));
                }
            }
        }
    }
    hasAll(...names) {
        const { form } = this;
        let check;
        for (const name of names) {
            if (form.has(name)) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        return check;
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