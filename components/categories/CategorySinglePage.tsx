import React from 'react'
import Link from 'next/link'
export default function Category({ src, name }) {
    return (
        <div className="category-inside">
            <div className="photo">
                <img src={src} />
            </div>
            <div className="container">
                <div className="lable">
                    <h4>{name}</h4>
                </div>
            </div>
        </div>
    )
}
