import React, { useEffect, useState } from 'react'
import active from '../../helpers/active'
import CartItem from './MiniCartItem'
import Link from 'next/link'
import cart from '../../api/cart';
import { connect } from 'react-redux';
import { Main } from '../../redux/dispatcher';
import handlePath from '../../helpers/picturePath';

function MiniCart({ expand, close, authenticated, cart }) {
    const formKey = 'MiniCart';
    const [cartItems, setCartItems] = useState([]);
    useEffect(async () => {
        if (authenticated && cart) {
            const items = cart.map(item => {
                const src = JSON.parse(item.pictures);
                return <CartItem key={item.id} formKey={formKey} quantity={item.pivot.product_count} id={item.id} name={item.name} src={handlePath(src[0].path)} price={item.price} />
            })
            setCartItems(items);
        }
    }, [cart]);
    return (
        <div id="cart" className={active(expand)}>
            <div className="head">
                <h4>Your Cart</h4>
                <div className="close" onClick={close}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="content">
                {
                    cartItems.length === 0 ?
                        <div className='empty-cart'>
                            <i className="fas fa-shopping-cart"></i>
                            <strong>Empty cart</strong>
                        </div>
                        : cartItems
                }
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
const mapStateToProps = state => ({
    authenticated: state.main.authenticated,
    cart: state.customerEnv.cart,
})
export default connect(mapStateToProps)(MiniCart);