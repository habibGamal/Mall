export default function invalid(name,errors){
    if(errors !== null){
        if(errors.hasOwnProperty(name)){
            return errors[name];
        }
    }
    return [''];
}