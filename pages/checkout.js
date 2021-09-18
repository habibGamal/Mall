import React from 'react'
import Link from 'next/link'

export default function Checkout() {
    return (
        <section className="checkout">
            <div className="container">
                <div className="invoice">
                    <h3>Invoice</h3>
                    <ul>
                        <li>Your Name : Habib Gamal</li>
                        <li>Your Phone Number : 01021153539</li>
                        <li>Shippin Cost : 20 LE</li>
                        <li>Total ( before discount ) : 1500 LE</li>
                        <li>Total ( after discount ) : 1100 LE</li>
                    </ul>
                    <span className="final">You Will Pay : <strong>1100</strong> LE</span>
                    <ul>
                        <li>Shipping Address :
                            حي السادات شارع النصر عمارة 12 الدور5</li>
                        <li>+ Add another address</li>
                    </ul>
                    <Link href="/checkout">
                        <a className="btn btn-primary btn-block">Place Order</a>
                    </Link>
                    <Link href="/cart">
                        <a className="btn btn-outline-primary btn-block">Go Back</a>
                    </Link>
                </div>
            </div>
        </section>
    )
}
