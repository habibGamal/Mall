import React from 'react'
import Link from 'next/link'
import order from '../api/order'
import t from '../helpers/translate';
export default function Checkout() {
    async function placeOrder() {
        const res = await order.make();
        console.log(res.data);
    }
    return (
        <section className="checkout">
            <div className="container">
                <div className="invoice">
                    <h3>{t('Invoice', 'الفاتورة')}</h3>
                    <ul>
                        <li>{t('Your Name', 'اسمك')} : Habib Gamal</li>
                        <li>{t('Your Phone Number', 'رقم الهاتف')} : 01021153539</li>
                        <li>{t('Shipping Cost', 'تكلفة التوصيل')} : 20 {t('LE', 'جنية')}</li>
                        <li>{t('Total ( before discount )', 'الحساب الكلي ( قبل الخصم )')} : 1500 {t('LE', 'جنية')}</li>
                        <li>{t('Total ( after discount )', 'الحساب الكلي ( بعد الخصم )')} : 1100 {t('LE', 'جنية')}</li>
                    </ul>
                    <span className="final">{t('You Will Pay', 'سوف تدفع')} : <strong>1120</strong> {t('LE', 'جنية')}</span>
                    <ul>
                        <li>{t('Shipping Address', 'العنوان الذي سيتم الشحن اليه')} :
                            حي السادات شارع النصر عمارة 12 الدور5</li>
                    </ul>
                    <Link href="/cart">
                        <a>{t('+ Add another address', 'اضافة عنوان اخر +')}</a>
                    </Link>
                    <button onClick={placeOrder} className="btn btn-primary btn-block">{t('Place Order', 'اطلب الان')}</button>
                    <Link href="/cart">
                        <a className="btn btn-outline-primary btn-block">{t('Go Back', 'الرجوع للسلة')}</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}
