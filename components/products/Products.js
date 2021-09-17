import React, { useEffect, useRef, useState } from 'react'
import isdefined from '../../helpers/isdefined'
import RowScroll from '../general/RowScroll'
import Product from './Product'

export default function Products({title}) {
    return (
        <section className="products">
            <div className="container">
                {isdefined(title,<h2>{title}</h2>)}
                <RowScroll>
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
