import BackendCategory from "../BackendTypes/BackendCategory";

export default class Category {
    as: string;
    level: number;
    value: number;
    children: Array<Category> = [];
    constructor(cateogry: BackendCategory, noChildren: boolean = false) {
        this.as = cateogry.name;
        this.level = cateogry.level;
        this.value = cateogry.id;
        if (!noChildren)
            this.setChildren(cateogry.sub_categories);
    }
    setChildren(subCategories: Array<BackendCategory>) {
        if (subCategories.length !== 0) {
            subCategories.forEach(cat => { this.children.push(new Category(cat)) });
        }
    }
    static mappingAllCategories(categories: Array<BackendCategory>) {
        let buffer: Category[] = [];
        const mapCategory = (category: BackendCategory) => {
            buffer.push(new Category(category, true));
            category.sub_categories?.forEach(cat => mapCategory(cat));
        }
        categories.forEach(category => mapCategory(category));
        return buffer;
    }

    static mapping(categories: Array<BackendCategory>) {
        return categories.map(
            (category: BackendCategory) => new Category(category)
        )
    }

}