export default function invalid(name, errors, specialType) {
    if (errors !== null) {
        if (specialType) {
            switch (specialType) {
                case 'period':
                    // => ex: work_hours -> check for work_hours.from or work_hours.to
                    if (errors.hasOwnProperty(`${name}.form`)) {
                        return errors[`${name}.form`];
                    }
                    if (errors.hasOwnProperty(`${name}.to`)) {
                        return errors[`${name}.to`];
                    }
                    return;
            }
        }
        if (errors.hasOwnProperty(name)) {
            return errors[name];
        }
    }
    return [''];
}