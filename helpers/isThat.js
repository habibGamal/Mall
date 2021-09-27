export default function isThat(element,tagName,{className,id}={}){
    if(id === undefined){
        id = ''
    }
    if(className === undefined){   
        return element.tagName === tagName && element.id.includes(id);
    }
    return element.tagName === tagName && element.classList.contains(className) && element.id.includes(id);
}