import React from 'react'
import Link from 'next/link'

export default function Orders() {
    return (
        <div className="orders">
            <div className="order">
                <h4>Order #364987</h4>
                <span>Products :</span>
                <ul>
                    <li>
                        <Link href="/product">Dri-FIT Swoosh Training T-Shirt White/University </Link>
                        <span className="details">
                            <span className="point">
                                Size : XL
                            </span>
                            <span className="point">
                                Color : Red
                            </span>
                            <span className="point">
                                Price : <strong>350</strong> LE
                            </span>
                        </span>
                        <button className="btn btn-outline-danger">This product is not exists</button>
                    </li>
                    <li>
                        <Link href="/product">Dri-FIT Swoosh Training T-Shirt White/University </Link>
                        <span className="details">
                            <span className="point">
                                Size : XL
                            </span>
                            <span className="point">
                                Color : Red
                            </span>
                            <span className="point">
                                Price : <strong>350</strong> LE
                            </span>
                        </span>
                        <button className="btn btn-outline-danger">This product is not exists</button>
                    </li>
                </ul>
                <div className="buttons">
                    <button className="btn btn-danger">Reject the order</button>
                    <button className="btn btn-primary">Accept the order</button>
                </div>
            </div>
        </div>
    )
}
