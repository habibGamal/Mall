import React from 'react'
import Link from 'next/link'
export default function Store({ name, href, src, inside }) {
    if (inside === true) {
        return (
            <div className="store">
                <div className="logo">
                    <img src={src} />
                </div>
                <div className="name">
                    <h3>{name}</h3>
                </div>
            </div>
        )
    }
    return (
        <Link href={href}>
            <a className="store">
                <div className="logo">
                    <img src={src} />
                </div>
                <div className="name">
                    <h3>{name}</h3>
                </div>
            </a>
        </Link>
    )
}
