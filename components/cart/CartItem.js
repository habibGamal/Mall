import React from 'react'
import Image from 'next/image'
import Input from '../inputs/Input'
import Link from 'next/link'

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
                    <Input
                        label={null}
                        type="select"
                        addClass=""
                        options={[
                            '1',
                            '2'
                        ]}
                    />
                    <button className="btn btn-warning">Save in wish list</button>
                    <button className="btn btn-outline-danger">Remove Item</button>
                </div>
            </div>
        </div>
    )
}
