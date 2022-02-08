import React, { useEffect, useState } from 'react'
import CartItem from '../components/cart/CartItem'
import Link from 'next/link'
import { connect } from 'react-redux';
import handlePath from '../helpers/picturePath';
import t from '../helpers/translate';
function Cart({ authenticated, cart }) {
    const formKey = 'MiniCart';
    const [cartItems, setCartItems] = useState([]);
    useEffect(async () => {
        if (authenticated && cart) {
            const items = cart.map(item => {
                const src = JSON.parse(item.pictures);
                return <CartItem key={item.id} formKey={formKey} shopName="Brave" quantity={item.pivot.product_count} id={item.id} name={item.name} src={handlePath(src[0].path)} price={item.price} />
            })
            setCartItems(items);
        }
    }, [cart]);
    return (
        <section className="cart-page">
            <div className="container">
                <div className="cart">
                    <h2>{t('Your Cart', 'سلتك')} (3)</h2>
                    {
                        cartItems.length === 0 ?
                            <div className='empty-cart'>
                                <i className="fas fa-shopping-cart"></i>
                                <strong>Empty cart</strong>
                            </div>
                            : cartItems
                    }
                    <button className="btn btn-outline-danger m-2">{t('Empty the cart','تفريغ السلة')}</button>
                    <Link href="/">
                        <a className="btn btn-outline-primary m-2">{t('Continue Shopping','استكمال التسوق')}</a>
                    </Link>
                </div>
                <div className="summary">
                    <h3>{t('Order Summary','ملخص الطلب')}</h3>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder={t('Coupon or Offer Code','كود عرض')} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary z-index-1">{t('APPLY','تأكيد')}</button>
                        </div>
                    </div>
                    <ul>
                        <li>{t('Shipping Cost','تكلفة التوصيل')} : 20 {t('LE','جنية')}</li>
                        <li>{t('Total ( before discount )','الحساب الكلي ( قبل الخصم )')} : 1500 {t('LE','جنية')}</li>
                        <li>{t('Total ( after discount )','الحساب الكلي ( بعد الخصم )')} : 1100 {t('LE','جنية')}</li>
                    </ul>
                    <span className="final">{t('You Will Pay','سوف تدفع')} : <strong>1120</strong> {t('LE','جنية')}</span>
                    <Link href="/checkout">
                        <a className="btn btn-outline-primary btn-block">{t('Checkout','الدفع')}</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    authenticated: state.main.authenticated,
    cart: state.customerEnv.cart,
    lang: state.translate.language
})
export default connect(mapStateToProps)(Cart);
