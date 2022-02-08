import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import order from '../../../../api/order'
import Loading from '../../../../directives/Loading';
import Select from '../../../inputs/Select';
import { connect } from 'react-redux';
import branch from '../../../../api/branch';
import Empty from '../../../general/Empty';

const formKey = 'dashboard_orders'
function Orders({getInputValue}) {
    const [orders, setOrders] = useState([]);
    const [branches, setBranches] = useState([] as Array<{ id: number, name: string }>);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const branchId = getInputValue('branch_id');
        setLoading(false);
        const getOrders = async () => {
            const res = await order.getOrdersForBranch(branchId);
            if (res.status === 200) {
                setOrders(res.data);
                setLoading(true);
            }
        }
        if(branchId){
            getOrders();
        }
    }, [getInputValue('branch_id')]);
    useEffect(() => {
        const getOrders = async () => {
            const res = await order.getOrdersForBranch(0);
            if(res.status === 200){
                const getIds = await branch.getBranchesIds();
                setOrders(res.data);
                setBranches(getIds.data);
                setLoading(true);
            }
        }
        getOrders();
    }, []);
    return (
        <div className="orders">
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
            <Loading state={loading} mini={true}>
                {
                    
                    orders.length === 0
                    ? <Empty msg="You haven't recived any orders yet" />
                    :orders.map(
                        order => <Order key={order.id} order={order} />
                    )
                }
            </Loading>
        </div>
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

export default connect(mapStateToProps)(Orders)
function Order({ order }) {
    return (
        <div className="order my-4">
            <h4>Order #{order.id}</h4>
            <span>Products :</span>
            <ul>
                {
                    order.products.map(
                        product => <Product key={order.id*product.id} product={product} />
                    )
                }
            </ul>
            <div className="buttons">
                <button className="btn btn-danger">Reject the order</button>
                <button className="btn btn-primary">Accept the order</button>
            </div>
        </div>
    )
}

function Product({ product }) {
    return (
        <li>
            <Link href={`/product/${product.id}`}>{product.name}</Link>
            <span className="details">
                <span className="point">
                    Size : XL
                </span>
                <span className="point">
                    Color : Red
                </span>
                <span className="point">
                    Price : <strong>{product.price}</strong> LE
                </span>
            </span>
            <button className="btn btn-outline-danger">This product is not exists</button>
        </li>
    )
}