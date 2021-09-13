import React from 'react'
import Link from 'next/link'
export default function store({name,href,src}) {
    return (
        <Link href={href}>
            <a className="col-lg-3 col-sm-6 store">
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
