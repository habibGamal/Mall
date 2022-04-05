type BackendCartItem = {
    id: number,
    name: string,
    offer_price: number,
    pivot: {
        product_count: number,
    }
    pictures: string,
}

export default BackendCartItem;