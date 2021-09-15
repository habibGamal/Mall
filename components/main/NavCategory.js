import React from 'react'
import Link from 'next/link'
export default function NavCategory({content,href}) {
    return (
        <li>
            <Link href={href}>
                <a>{content}</a>
            </Link>
        </li>
    )
}
