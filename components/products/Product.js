import React, {useMemo, useState } from 'react'
import Link from 'next/link'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
export default function Product({ selectable, selected , name, price, offerPrice, currency, src, href }) {
    const [select,setSelect] = useState(false);
    const [menuT,setMenuT] = useState(false);
    const router = useRouter();
    useMemo(() => setSelect(selected), [selected]);
    function selectHandle(){
        setSelect(!select);
    }
    function clickHandle(e,href){
        e.preventDefault();
        if(e.target.tagName === 'IMG'){
            router.push(href);
        }
    }
    if (selectable !== undefined && selectable === true) {
        return (
            <div onClick={selectHandle} className="product" data-selected={select}>
                <span className={active(select,{activeClass:'selected',defaultClass:'selectable-box'})}>
                    <i className="fas fa-check" />
                </span>
                <img src={src} alt="T-shirt" draggable={false} />
                <div className="product-details p-3 text-center">
                    <h5>{name}</h5>
                    <span className="separator"></span>
                    <h5 className="price pt-3"><del className="mr-4">{price} {currency}</del> {offerPrice} {currency}</h5>
                </div>
            </div>
        )
    }
    return (
        <div className="product" onClick={(e)=>clickHandle(e,href)}>
            <img src={src} alt="T-shirt" />
            <div className="product-details p-3 text-center">
                <div onClick={()=>setMenuT(!menuT)} className="menu-bars">
                    <i className="fas fa-bars"></i>
                </div>
                <div className={active(menuT,{defaultClass:'menu'})}>
                    <Link href="/product/edit">
                        <a>
                            <i class="fas fa-edit"></i> Edit
                        </a>
                    </Link>
                    <button className="btn btn-mini"><i class="fas fa-trash"></i> Delete</button>
                    <button className="btn btn-mini"><i class="fas fa-file"></i> Draft</button>
                </div>
                <h5>{name}</h5>
                <span className="separator"></span>
                <h5 className="price pt-3"><del className="mr-4">{price} {currency}</del> {offerPrice} {currency}</h5>
            </div>
        </div>
    )
}
