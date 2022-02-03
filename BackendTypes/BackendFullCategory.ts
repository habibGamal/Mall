export type BackendFullCategory = {
    created_at: string,
    id: number,
    level: number,
    name: string,
    parent_id: number,
    products: [{
        branches: [
            {
                id: number,
                logo: string,
                name: string,
            }
        ],
        category_id: number,
        id: number,
        name: string,
        offer_price: number,
        pictures: string,
        price: number
    }]
}