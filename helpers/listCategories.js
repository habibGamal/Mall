function catLevel(level) {
    let buffer = '';
    for (let i = 0; i < level; i++) {
        buffer += '→';
    }
    return buffer;
}
function mappingCategory(c) {
    let buffer = [];
    buffer.push({ value: c.id, as: catLevel(c.level) + c.name });
    if (c.sub_categories.length !== 0) {
        c.sub_categories.forEach(cc => buffer.push(...mappingCategory(cc)));
    }
    return buffer;
}
export default function listCategories(categories) {
    if (categories !== null) {
        let buffer = [];
        categories.forEach(c => {
            buffer.push(...mappingCategory(c));
        });
        return buffer;
    }
    return [{}];
}