import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
export default function Product({ selectable, selected, name, price, offerPrice, currency, src, href }) {
    const [select, setSelect] = useState(false);
    const [menuT, setMenuT] = useState(false);
    const router = useRouter();
    useMemo(() => setSelect(selected), [selected]);
    function selectHandle() {
        setSelect(!select);
    }
    function clickHandle(e, href) {
        e.preventDefault();
        if (e.target.tagName === 'IMG') {
            router.push(href);
        }
    }
    if (selectable !== undefined && selectable === true) {
        return (
            <div onClick={selectHandle} className="product" data-selected={select}>
                <span className={active(select, { activeClass: 'selected', defaultClass: 'selectable-box' })}>
                    <i className="fas fa-check" />
                </span>
                <Image src={src} objectFit="cover" layout="fill" alt="T-shirt" draggable={false} />
                <div className="product-details p-3 text-center">
                    <h5>{name}</h5>
                    <span className="separator"></span>
                    <h5 className="price pt-3"><del className="mr-4">{price} {currency}</del> {offerPrice} {currency}</h5>
                </div>
            </div>
        )
    }
    return (
        <div className="product" onClick={(e) => clickHandle(e, href)}>
            <div className="picture">
                <Image src={src} layout="fill" className="img"  alt="T-shirt" />
            </div>
            <div className="product-details">
                <div onClick={() => setMenuT(!menuT)} className="menu-bars">
                    <i className="fas fa-bars"></i>
                </div>
                <div className={active(menuT, { defaultClass: 'menu' })}>
                    <Link href="/product/edit">
                        <a>
                            <i className="fas fa-edit"></i> Edit
                        </a>
                    </Link>
                    <button className="btn btn-mini"><i className="fas fa-trash"></i> Delete</button>
                    <button className="btn btn-mini"><i className="fas fa-file"></i> Draft</button>
                </div>
                <span className="name">{name}</span>
                <span className="separator"></span>
                <span className="price">
                    <span className="old">
                        <del>{price} {currency}</del>
                        <span className="badge badge-success">11%</span>
                    </span>
                    <strong>{offerPrice}</strong> {currency}
                </span>
            </div>
        </div>
    )
}
