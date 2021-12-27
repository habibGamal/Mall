type CategoryType = {
    id: number, 
    name: string, 
    parent_category?: CategoryType
}

export default CategoryType;