import React from 'react'
import CartItem from '../components/cart/CartItem'
import Link from 'next/link'
export default function Cart() {
    return (
        <section className="cart-page">
            <div className="container">
                <div className="cart">
                    <h2>Your Cart (3)</h2>
                    <CartItem
                        src="/images/cat_1.jpg"
                        name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                        price={320}
                        shopName="Brave"
                    />
                    <CartItem
                        src="/images/cat_4.jpg"
                        name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                        price={320}
                        shopName="Brave"
                    />
                    <CartItem
                        src="/images/cat_6.jpg"
                        name="Dri-FIT Swoosh Training T-Shirt White/University Red XL"
                        price={320}
                        shopName="Brave"
                    />
                    <button className="btn btn-outline-danger m-2">Empty the cart</button>
                    <Link href="/">
                        <a className="btn btn-outline-primary m-2">Continue Shopping</a>
                    </Link>
                </div>
                <div className="summary">
                    <h3>Order Summary</h3>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Coupon or Offer Code" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary">APPLY</button>
                        </div>
                    </div>
                    <ul>
                        <li>Shippin Cost : 20 LE</li>
                        <li>Total ( before discount ) : 1500 LE</li>
                        <li>Total ( after discount ) : 1100 LE</li>
                    </ul>
                    <span className="final">You Will Pay : <strong>1100</strong> LE</span>
                    <Link href="/checkout">
                        <a className="btn btn-outline-primary btn-block">Checkout</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}
