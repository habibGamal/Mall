import React from 'react'
import Link from 'next/link'
export default function Category({href,src,name}) {
    return (
        <Link href={href}>
            <a href="" className="category">
                <div className="photo">
                    <img src={src} />
                </div>
                <div className="lable">
                    <h4>{name}</h4>
                </div>
            </a>
        </Link>
    )
}
