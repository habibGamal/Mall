import React, { useEffect, useState } from 'react'
import product from '../../../../api/product'
import active from '../../../../helpers/active'
import Product from '../../../products/Product'
import ProductModel from '../../../../models/Product'
import BackendProduct from '../../../../BackendTypes/BackendProduct'
import Empty from '../../../general/Empty'
import Loading from '../../../../directives/Loading'
import Select from '../../../inputs/Select'
import { Forms } from '../../../../redux/dispatcher'
import branch from '../../../../api/branch'
import { connect } from 'react-redux'

const formKey = 'dashboard_products'

function Products({ getInputValue }) {
    const [selectable, setSelectable] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [products, setProducts] = useState([] as Array<ProductModel>);
    const [branches, setBranches] = useState([] as Array<{ id: number, name: string }>);
    const [loadingProducts, setLoading] = useState(false);
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => {
            Forms.unattachForm(formKey);
        };
    }, []);
    useEffect(() => {
        const branchId = getInputValue('branch_id');
        const getProducts = async () => {
            const res = await branch.branchProducts(branchId);
            if (res.status === 200) {
                const products: Array<ProductModel> = (res.data as Array<BackendProduct>).map(product => new ProductModel(product));
                setProducts(products);
            }
        }
        if(branchId){
            getProducts();
        }
    }, [getInputValue('branch_id')]);
    useEffect(() => {
        const getProducts = async () => {
            const res = await branch.branchProducts(0);
            const getIds = await branch.getBranchesIds();
            if (res.status === 200) {
                const products: Array<ProductModel> = (res.data as Array<BackendProduct>).map(product => new ProductModel(product));
                setProducts(products);
                setBranches(getIds.data);
                setLoading(true);
            }
        }
        getProducts();
    }, []);

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (!selectAll) {
            setSelectable(e.target.checked);
        }
    }
    function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectAll(e.target.checked);
        setSelectable(e.target.checked);
    }
    function getSelectedProducts() {
        // => get all elements{products} that have data-selected = true
        const products = [...document.querySelectorAll('[data-selected=true]')];
        // => get the ids from the selected elements
        const ids = products.map(p => p.getAttribute('data-product-id'));
        return ids;
    }
    async function deleteProducts() {
        const ids = getSelectedProducts();
        const res = await product.deleteList({ ids });
        if (res.status === 200) {
            let newProducts = products.filter(p => {
                for (const id of ids) {
                    if (product.id == id) {
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
                        <Select
                            label={null}
                            name="branch_id"
                            id="branch_id"
                            addClass=""
                            options={
                                branches.map(branch => ({ value: branch.id, as: branch.name }))
                            }
                            formKey={formKey}
                        />
                    </div>
                    <div className={active(selectable, { defaultClass: 'buttons' })}>
                        <button onClick={deleteProducts} className="btn btn-danger">Delete</button>
                        <button className="btn btn-dark">Draft</button>
                    </div>
                </div>
                <button className="btn btn-add"><i className="fas fa-plus-circle" /> Add Product</button>
            </div>
            <div className="products">
                <div className="row">
                    <Loading state={loadingProducts} mini={true}>
                        {
                            products.length === 0
                                ? <Empty msg="You haven't create any products yet" />
                                : products.map(product => {
                                    const { path, position } = product.picture;
                                    return (
                                        <Product
                                            selectable={selectable}
                                            selected={selectAll}
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            offerPrice={product.offer_price}
                                            currency="LE"
                                            src={path}
                                            position={position}
                                        />
                                    )
                                })
                        }
                    </Loading>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    getInputValue: (name: string) => {
        if (state.forms[formKey]) {
            if (state.forms[formKey][name]) {
                return state.forms[formKey][name];
            }
        }
        return null;
    },
})

export default connect(mapStateToProps)(Products)