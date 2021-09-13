export function getChildrenByClassName(collection,className){
    let children = [].slice.call(collection);
    let result = [];
    children.forEach(child=>{
        if(child.classList.contains(className)){
            result.push(child);
        }
    });
    return result;
}