import React, { useEffect, useRef, useState } from 'react'
import product from '../../api/product';
import isdefined from '../../helpers/isdefined'
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
                    {products.map(p => {
                        let {path,position} = JSON.parse(p.pictures)[0];
                        path = process.env.NEXT_PUBLIC_BASE_URL_STORAGE+path.replace('public','');
                        return (
                            <Product
                                key={p.id}
                                name={p.name}
                                price={p.price}
                                offerPrice={p.offer_price}
                                currency="LE"
                                src={path}
                                href="/product"
                                position={JSON.parse(position)}
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
                    />
                    <Product
                        name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_2.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_3.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_4.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_6.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_1.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_3.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_6.jpg"
                        href="/products"
                    />
                    <Product
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_2.jpg"
                        href="/products"
                    />
                </RowScroll>
            </div>
        </section>
    )
}
