import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Select from '../inputs/Select'

export default function CartItem({src,name,price,shopName,quantity}) {
    return (
        <div className="cart-item">
            <div className="picture">
                <Image src={src} layout="fill"  className="img" />
            </div>
            <div className="details">
                <span className="sold-by">Sold by <Link href="/store">{shopName}</Link></span>
                <span className="name">{name}</span>
                <div className="interact">
                    <span>Price : <strong>{price}</strong> LE</span>
                    <Select
                        label={null}
                        addClass=""
                        options={[
                            { value: 1, as: '1' },
                            { value: 2, as: '2' },
                        ]}
                    />
                    <button className="btn btn-warning">Save in wish list</button>
                    <button className="btn btn-outline-danger">Remove Item</button>
                </div>
            </div>
        </div>
    )
}
