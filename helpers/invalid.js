export default function invalid(name, errors, specialType) {
    if (specialType) {
        switch (specialType) {
            case 'period':
                // => ex: work_hours -> check for work_hours.from or work_hours.to
                if (errors) {
                    if (errors.hasOwnProperty(`${name}.from`) || errors.hasOwnProperty(`${name}.to`)) {
                        return { from: errors[`${name}.from`] ?? '', to: errors?.[`${name}.to`] ?? '' };
                    }
                    return { from: '', to: '' };
                }
                return { from: '', to: '' };
            case 'listOfErrors':
                if(errors){
                    return errors[name] ?? [];
                }
                return [];
            default:
                return;

        }
    }
    if (errors) {
        // console.log(name,errors);
        if (errors.hasOwnProperty(name)) {
            return errors[name];
        }
    }
    return [''];
}