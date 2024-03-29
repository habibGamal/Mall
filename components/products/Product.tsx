import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
import Admin from '../../directives/Admin';
import PicturePosition from '../../types/PicturePosition';
import loader from '../../loader';
interface ProductProps {
    id: number,
    name: string,
    src: string,
    position: PicturePosition,
    price: number,
    offerPrice: number,
    currency: string,
    selected?: boolean,
    selectable?: boolean,
}
export default function Product({ selectable, id, selected, name, price, offerPrice, currency, src, position }: ProductProps) {
    const [select, setSelect] = useState(false);
    const [menuT, setMenuT] = useState(false);
    const router = useRouter();
    useEffect(() => setSelect(selected), [selected]);
    const img = useMemo(() => <Image src={src} width={200} height={200} objectPosition={`${position.leftP}% ${-1 * position.topP}%`} className="img" alt="T-shirt" />, []);
    function selectHandle() {
        setSelect(!select);
    }
    if (selectable) {
        // => data-selected is attribute to help in selecting the products selected
        return (
            <div className="product" onClick={selectHandle} data-selected={select} data-product-id={id}>
                <span className={active(select, { activeClass: 'selected', defaultClass: 'selectable-box' })}>
                    <i className="fas fa-check" />
                </span>
                <div className="picture">
                    {img}
                </div>
                <div className="product-details">
                    <Admin>
                        <div onClick={() => setMenuT(!menuT)} className="menu-bars">
                            <i className="fas fa-bars"></i>
                        </div>
                        <div className={active(menuT, { defaultClass: 'menu' })}>
                            <Link href={`/product/edit/${id}`}>
                                <a>
                                    <i className="fas fa-edit"></i> Edit
                                </a>
                            </Link>
                            <button className="btn btn-mini"><i className="fas fa-trash"></i> Delete</button>
                            <button className="btn btn-mini"><i className="fas fa-file"></i> Draft</button>
                        </div>
                    </Admin>
                    <span className="name">{name}</span>
                    <span className="separator"></span>
                    <span className="price">
                        {offerPrice ?
                            <span className="old">
                                <del>{price} {currency}</del>
                                <span className="badge badge-success">11%</span>
                            </span> : ''
                        }
                        <strong>{offerPrice ? offerPrice : price}</strong> {currency}
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className="product">
            <div className="picture" onClick={() => router.push(`/product/${id}`)}>
                {/* {img} */}
                {                // eslint-disable-next-line @next/next/no-img-element
                }                <img src={src} style={{ height: position.heightP + '%', objectPosition: `${position.leftP}% ${-1 * position.topP}%` }} className="img" alt="T-shirt" />
            </div>
            <div className="product-details">
                <Admin>
                    <div onClick={() => setMenuT(!menuT)} className="menu-bars">
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className={active(menuT, { defaultClass: 'menu' })}>
                        <Link href={`/product/edit/${id}`}>
                            <a>
                                <i className="fas fa-edit"></i> Edit
                            </a>
                        </Link>
                        <button className="btn btn-mini"><i className="fas fa-trash"></i> Delete</button>
                        <button className="btn btn-mini"><i className="fas fa-file"></i> Draft</button>
                    </div>
                </Admin>
                <span className="name">{name}</span>
                <span className="separator"></span>
                <span className="price">
                    {offerPrice ?
                        <span className="old">
                            <del>{price} {currency}</del>
                            <span className="badge badge-success">11%</span>
                        </span> : ''
                    }
                    <strong>{offerPrice ? offerPrice : price}</strong> {currency}
                </span>
            </div>
        </div>
    )
}
