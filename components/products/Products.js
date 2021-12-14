import React, { useEffect, useRef, useState } from 'react'
import product from '../../api/product';
import isdefined from '../../helpers/isdefined'
import Picture from '../../models/Picture';
import RowScroll from '../general/RowScroll'
import Product from './Product'

export default function Products({ title }) {
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        let res = await product.index();
        if (res.status === 200) {
            setProducts(res.data);
        }
    }, []);
    return (
        <section className="products">
            <div className="container">
                {isdefined(title, { trueReturn: <h2>{title}</h2> })}
                <RowScroll>
                    {products.map(product => {
                        const picture = Picture.getPicture(product);
                        return (
                            <Product
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                offerPrice={product.offer_price}
                                currency="LE"
                                src={picture.path}
                                href={`/product/${product.id}`}
                                position={picture.position}
                            />
                        )
                    })}
                    <Product
                        name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_1.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_2.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_3.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_4.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_6.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_1.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_3.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_6.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_2.jpg"
                        href="/products"
                        position={{ "leftP": 50, "topP": 0 }}
                    />
                </RowScroll>
            </div>
        </section>
    )
}
