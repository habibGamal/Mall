import React, { useEffect, useState } from 'react'
import active from '../../helpers/active'
import CartItem from './MiniCartItem'
import { connect } from 'react-redux';
import handlePath from '../../helpers/picturePath';
import { useRouter } from 'next/router';
import t from '../../helpers/translate';
import BackendCartItem from '../../BackendTypes/BackendCartItem';
import CartItemModel from '../../models/CartItem';
import { RootState } from '../../redux/store';
function MiniCart({ expand, close, authenticated, cart }) {
    const router = useRouter();
    const [cartItems, setCartItems] = useState([]);
    useEffect( () => {
        if (authenticated && cart) {
            const items = cart.map((item:BackendCartItem) => {
                const cartItem = new CartItemModel(item);
                return <CartItem key={cartItem.id} item={cartItem} />
            })
            setCartItems(items);
        }
    }, [cart,authenticated]);
    function toCart(){
        router.push('/cart');
        close();
    }
    return (
        <div id="cart" className={active(expand)}>
            <div className="head">
                <h4>{t('Your Cart','سلتك')}</h4>
                <div className="close" onClick={close}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
            <div className="content">
                {
                    cartItems.length === 0 ?
                        <div className='empty-cart'>
                            <i className="fas fa-shopping-cart"></i>
                            <strong>{t('Empty cart','السلة فارغة')}</strong>
                        </div>
                        : cartItems
                }
            </div>
                <button onClick={toCart} className="btn btn-outline-primary btn-block">
                    {t('Go to Cart','الى السلة')}
                    <i className={`fas fa-long-arrow-alt-${t('right','left')} mx-2`}></i>
                </button>
        </div>
    )
}
const mapStateToProps = state => ({
    authenticated: state.main.authenticated,
    cart: state.customerEnv.cart,
})
export default connect(mapStateToProps)(MiniCart);