import React, { useEffect, useRef, useState } from 'react'
import product from '../../api/product';
import BackendProduct from '../../BackendTypes/BackendProduct';
import isdefined from '../../helpers/isdefined'
import ProductModel from '../../models/Product';
import RowScroll from '../general/RowScroll'
import Product from './Product'

export default function Products({ title, rawProducts }: { title: string, rawProducts: Array<BackendProduct> }) {
    const [products, setProducts] = useState([] as Array<ProductModel>);
    useEffect(() => {
        const getProducts = async () => {
            let res = await product.index();
            if (res.status === 200) {
                const products: Array<ProductModel> = (res.data as Array<BackendProduct>).map(product => new ProductModel(product));
                setProducts(products);
            }
        }
        if (!rawProducts) {
            getProducts();
            return;
        }
        const products: Array<ProductModel> = rawProducts.map(product => new ProductModel(product));
        setProducts(products);
    }, []);
    return (
        <section className="products">
            <div className="container">
                {
                    products.length === 0
                        ? <div className='empty-products'>
                            <i className="fas fa-box-open"></i>
                            <strong>There isn't products yet</strong>
                        </div>
                        :
                        <>
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
                            </RowScroll>
                        </>
                }

            </div>
        </section>
    )
}
