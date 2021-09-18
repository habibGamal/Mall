import React from 'react'
import Image from 'next/image'
import Input from '../inputs/Input'

export default function CartItem({src,name,price,quantity}) {
    return (
        <div className="cart-item">
            <div className="close">
                <i className="fas fa-times"></i>
            </div>
            <div className="picture">
                <Image src={src} layout="fill" className="img" />
            </div>
            <div className="details">
                <span>{name}</span>
                <span>Price : <strong>{price}</strong> LE</span>
                <Input
                    label="Quantity"
                    type="select"
                    addClass=""
                    options={[
                        '1',
                        '2'
                    ]}
                />
            </div>
        </div>
    )
}
