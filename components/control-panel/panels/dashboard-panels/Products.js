import React, { useState } from 'react'
import active from '../../../../helpers/active';
import Product from '../../../products/Product'
export default function Products() {
    const [selectable,setSelectable] = useState(false);
    const [selectAll,setSelectAll] = useState(false);
    function handleSelect(e){
        if(!selectAll){
            setSelectable(e.target.checked);
        }
    }
    function handleSelectAll(e){
        setSelectAll(e.target.checked);
        setSelectable(e.target.checked);
    }
    return (
        <>
            <div className="controllers">
                <div className="select">
                    <div className="form-check form-check-inline">
                        <input onChange={handleSelect} checked={selectable} className="form-check-input" hidden type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">
                            <span className="box">
                                <i className="fas fa-check" />
                            </span>
                            <span>
                                Select
                            </span>
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onChange={handleSelectAll} className="form-check-input" hidden type="checkbox" id="inlineCheckbox2" defaultValue="option1" />
                        <label className="form-check-label" htmlFor="inlineCheckbox2">
                            <span className="box">
                                <i className="fas fa-check" />
                            </span>
                            <span>
                                Select all
                            </span>
                        </label>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>فرع الجمهورية</option>
                            <option>فرع النميس</option>
                            <option>فرع الازهر</option>
                            <option>2 فرع الجمهورية</option>
                            <option>فرع الجمهورية</option>
                        </select>
                    </div>
                    <div className={active(selectable,{defaultClass:'buttons'})}>
                        <button className="btn btn-danger">Delete</button>
                        <button className="btn btn-dark">Draft</button>
                    </div>
                </div>
                <button className="btn btn-add"><i className="fas fa-plus-circle" /> Add Product</button>
            </div>
            <div className="products">
                <div className="row justify-content-center">
                    <Product
                        selectable={selectable}
                        selected={selectAll}
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                    />
                   <Product
                        selectable={selectable}
                        selected={selectAll}
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                    />
                    <Product
                        selectable={selectable}
                        selected={selectAll}
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                    />
                    <Product
                        selectable={selectable}
                        selected={selectAll}
                        name="Blouse"
                        price="250"
                        offerPrice="200"
                        currency="LE"
                        src="/images/cat_5.jpg"
                        href="/products"
                    />
                </div>
            </div>
        </>
    )
}
