type BackendCategory = {
    id: number,
    level: number,
    name: string,
    sub_categories: Array<BackendCategory>,
}

export default BackendCategory;