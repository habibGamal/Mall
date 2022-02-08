import React, { useEffect, useState } from 'react'
import active from '../../helpers/active'
import CartItem from './MiniCartItem'
import { connect } from 'react-redux';
import handlePath from '../../helpers/picturePath';
import { useRouter } from 'next/router';
import t from '../../helpers/translate';

function MiniCart({ expand, close, authenticated, cart }) {
    const router = useRouter();
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