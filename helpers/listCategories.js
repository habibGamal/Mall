function mappingAllCategories(c) {
    let buffer = [];
    buffer.push({ value: c.id, as: c.name, level:c.level });
    if (c.sub_categories.length !== 0) {
        c.sub_categories.forEach(cc => buffer.push(...mappingAllCategories(cc)));
    }
    return buffer;
}
function mappingBycategory(c){
    let buffer;
    buffer = { value: c.id, as: c.name, level:c.level ,children:[] };
    if (c.sub_categories.length !== 0) {
        c.sub_categories.forEach(cc => {buffer.children.push(mappingBycategory(cc))});
    }
    return buffer;
}
export default function listCategories(categories,byCategory=false) {
    if (categories !== null) {
        let buffer = [];
        categories.forEach(c => {
            if(byCategory){
                buffer.push(mappingBycategory(c));
            }else{
                buffer.push(...mappingAllCategories(c));
            }
        });
        return buffer;
    }
    return [{}];
}