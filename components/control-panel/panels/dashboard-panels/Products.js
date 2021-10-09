import React, { useEffect, useState } from 'react'
import product from '../../../../api/product'
import active from '../../../../helpers/active'
import Product from '../../../products/Product'
import p from '../../../../api/product'
export default function Products() {
    const [selectable, setSelectable] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        let res = await product.index();
        if (res.status === 200) {
            setProducts(res.data);
        }
    }, []);
    function handleSelect(e) {
        if (!selectAll) {
            setSelectable(e.target.checked);
        }
    }
    function handleSelectAll(e) {
        setSelectAll(e.target.checked);
        setSelectable(e.target.checked);
    }
    function getSelectedProducts() {
        // => get all elements{products} that have data-selected = true
        const products = Array.prototype.slice.call(document.querySelectorAll('[data-selected=true]'));
        // => get the ids from the selected elements
        const ids = products.map(p => p.getAttribute('data-product-id'));
        return ids;
    }
    async function deleteProducts() {
        const ids = getSelectedProducts();
        const res = await p.deleteList({ ids });
        if (res.status === 200) {
            let newProducts = products.filter(p => {
                for (const id of ids) {
                    if (p.id == id) {
                        return false;
                    }
                }
                return true;
            });
            setProducts(newProducts);
        }
    }
    return (
        <>
            <div className="controllers">
                <div className="select">
                    <div className="form-check">
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
                    <div className="form-check">
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
                    <div className={active(selectable, { defaultClass: 'buttons' })}>
                        <button onClick={deleteProducts} className="btn btn-danger">Delete</button>
                        <button className="btn btn-dark">Draft</button>
                    </div>
                </div>
                <button className="btn btn-add"><i className="fas fa-plus-circle" /> Add Product</button>
            </div>
            <div className="products">
                <div className="row justify-content-center">
                    {products.map(p => {
                        let { path, position } = JSON.parse(p.pictures)[0];
                        path = process.env.NEXT_PUBLIC_BASE_URL_STORAGE + path.replace('public', '');
                        return (
                            <Product
                                selectable={selectable}
                                selected={selectAll}
                                key={p.id}
                                id={p.id}
                                name={p.name}
                                price={p.price}
                                offerPrice={p.offer_price}
                                currency="LE"
                                src={path}
                                href={`/product/${p.id}`}
                                position={JSON.parse(position)}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
