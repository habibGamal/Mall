export default function active(check,{activeClass,defaultClass,falseClass}={}){
    if(activeClass === null || activeClass === undefined){
        activeClass = 'active';
    }
    if(defaultClass === undefined){
        defaultClass = '';
    }
    if(falseClass === undefined){
        falseClass = '';
    }
    return check ? `${defaultClass} ${activeClass}`:`${defaultClass} ${falseClass}`
}