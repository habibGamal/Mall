import React from 'react'
import Store from './Store'
import Products from '../products/Products'
export default function MiniShowStore({src,href,name}) {
    return (
        <div className="mini-show-store">
            <Store
                src={src}
                href={href}
                name={name}
            />
            <Products />
        </div>
    )
}
