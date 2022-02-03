import React, { useEffect, useRef, useState } from 'react'
import product from '../../api/product';
import BackendProduct from '../../BackendTypes/BackendProduct';
import isdefined from '../../helpers/isdefined'
import ProductModel from '../../models/Product';
import { MiniProduct } from '../../types/MiniProduct';
import RowScroll from '../general/RowScroll'
import Product from '../products/Product'

export default function Products({ products }: { products: Array<MiniProduct> }) {

    return (
        <section className="products">
            <div className="container">
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
                </RowScroll>

            </div>
        </section>
    )
}
