import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
export default function Category({ name, parentId, id, subcategories, lastCategory }) {
    const expandIcon = useRef(null);
    useEffect(()=>{
        if(expandIcon.current !== null){
            const toggler = ()=>{
                if(expandIcon.current.ariaExpanded === 'false'){
                    expandIcon.current.classList.remove('fa-plus-square');
                    expandIcon.current.classList.add('fa-minus-square');
                }else{
                    expandIcon.current.classList.remove('fa-minus-square');
                    expandIcon.current.classList.add('fa-plus-square');
                }
            }
            expandIcon.current.addEventListener('click',toggler);
        }
    },[])
    if (lastCategory) {
        return (
            <div className="category">
                <span className="category-name">
                    &#x2192;
                    <Link href="/category">{name}</Link>
                </span>
            </div>
        )
    }
    return (
        <div className="category" id={parentId}>
            <span className="category-name">
                <i ref={expandIcon} className="far fa-plus-square" type="button" data-toggle="collapse" data-target={`#${id}`} aria-expanded="false" aria-controls={id}></i>
                <Link href="/category">{name}</Link>
            </span>
            <div id={id} className="collapse " data-parent={`#${parentId}`}>
                <div className="subcategories">
                    {subcategories}
                </div>
            </div>
        </div>
    )
}
