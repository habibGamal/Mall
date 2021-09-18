import React from 'react'
import active from '../../helpers/active'
import CartItem from './MiniCartItem'
import Link from 'next/link'

export default function MiniCart({ expand, close }) {
    return (
        <div id="cart" className={active(expand)}>
            <div className="head">
                <h4>Your Cart</h4>
                <div className="close" onClick={close}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="content">
                <CartItem
                    src="/images/cat_2.jpg"
                    name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                    price={320}
                />
                <CartItem
                    src="/images/cat_1.jpg"
                    name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                    price={460}
                />
                <CartItem
                    src="/images/cat_4.jpg"
                    name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                    price={89}
                />
            </div>
            <Link href="/cart">
                <a className="btn btn-outline-primary btn-block">
                    Go to Cart
                    &#x2192;
                </a>
            </Link>
        </div>
    )
}
