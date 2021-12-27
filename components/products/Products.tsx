import React, { useEffect, useRef, useState } from 'react'
import product from '../../api/product';
import BackendProduct from '../../BackendTypes/BackendProduct';
import isdefined from '../../helpers/isdefined'
import ProductModel from '../../models/Product';
import RowScroll from '../general/RowScroll'
import Product from './Product'

export default function Products({ title }) {
    const [products, setProducts] = useState([] as Array<ProductModel>);
    useEffect(() => {
        const getProducts = async () => {
            let res = await product.index();
            if (res.status === 200) {
                const products: Array<ProductModel> = (res.data as Array<BackendProduct>).map(product => new ProductModel(product));
                setProducts(products);
            }
        }
        getProducts();
    }, []);
    return (
        <section className="products">
            <div className="container">
                {isdefined(title, { trueReturn: <h2>{title}</h2> })}
                <RowScroll>
                    {products.map(product => {
                        const { picture } = product;
                        return (
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                offerPrice={product.offer_price}
                                currency="LE"
                                src={picture.path}
                                position={picture.position}
                            />
                        )
                    })}
                    <Product
                        name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_1.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_2.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_3.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_4.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_5.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_6.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_1.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_3.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_6.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                    <Product
                        name="Blouse"
                        id={998}
                        price={250}
                        offerPrice={200}
                        currency="LE"
                        src="/images/cat_2.jpg"
                        position={{ leftP: 50, topP: 0, heightP: 100 }}
                    />
                </RowScroll>
            </div>
        </section>
    )
}
