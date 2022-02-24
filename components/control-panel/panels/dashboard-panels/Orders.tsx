import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import orderApi from '../../../../api/order'
import Loading from '../../../../directives/Loading';
import Select from '../../../inputs/Select';
import { connect } from 'react-redux';
import branch from '../../../../api/branch';
import Empty from '../../../general/Empty';
import t from '../../../../helpers/translate';
import { useRouter } from 'next/router';
import { Forms } from '../../../../redux/dispatcher';
import active from '../../../../helpers/active';
import OrderModel from '../../../../models/Order';
import ProductModel from '../../../../models/Product';
import { BackendOrder } from '../../../../BackendTypes/BackendOrder';

const formKey = 'dashboard_orders'
function Orders({ getInputValue }) {
    const router = useRouter();
    const urlBranch: string = router.query.branch as string;
    const [{orders,branches,loading},setState] = useState({
        orders : [] as Array<OrderModel>,
        branches : [] as Array<{ id: number, name: string }>,
        loading : false,
    })
    useEffect(() => {
        const branchId = getInputValue('branch_id');
        const getOrders = async () => {
            const res = await orderApi.getOrdersForBranch(branchId);
            if (res.status === 200) {
                setState(old => ({
                    ...old,
                    orders : res.data.map((order: BackendOrder) => new OrderModel(order)),
                    loading : true,
                }))
            }
        }
        if (branchId) {
            setState(old => ({
                ...old,
                loading : false,
            }))
            getOrders();
        }
    }, [getInputValue('branch_id')]);
    useEffect(() => {
        const getOrders = async () => {
            const res = await orderApi.getOrdersForBranch(urlBranch ?? 0);
            if (res.status === 200) {
                const getIds = await branch.getBranchesIds();
                setState({
                    orders : res.data.map((order: BackendOrder) => new OrderModel(order)),
                    branches : getIds.data,
                    loading : true,
                })
            }
        }
        getOrders();
    }, []);
    // select branch by url when branches loaded
    useEffect(() => {
        if (branches.length != 0 && urlBranch && branches[urlBranch]) {
            Forms.setInputValue(formKey, 'branch_id', urlBranch);
        }
    }, [branches, urlBranch]);
    
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
                        : orders.map(
                            order => <Order key={order.id} order={order} branch_id={getInputValue('branch_id') ?? branches[0].id} />
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

function Order({ order,branch_id }: { order: OrderModel,branch_id:number }) {
    const [orderState, setOrderState] = useState(order.status);
    async function acceptOrder() {
        const res = await orderApi.acceptOrder(branch_id, order.id);
        if (res.status === 200) {
            setOrderState('accepted');
        }
        // if (orderState == 'pending') {
        // }
    }

    return (
        <div className="order my-4">
            <h4>{t('Order', 'طلب')} #{order.id}</h4>
            <span>{t('Products', 'المنتجات المطلوبة')} :</span>
            <ul>
                {
                    order.items.map(
                        item => <Product key={item.id} product={item.product} />
                    )
                }
            </ul>
            <div className="buttons">
                <button className="btn btn-danger">{t('Reject the order', 'رفض الطلب')}</button>
                <button onClick={acceptOrder} className='btn btn-primary' >{t('Accept the order', 'قبول الطلب')}</button>
                {/* <button onClick={acceptOrder} className={active(orderState == 'accepted', { defaultClass: 'btn btn-primary', falseClass: 'd-none' })}>Out for Delevary</button> */}
            </div>
        </div>
    )
}

function Product({ product }: { product: ProductModel }) {
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
                    {t('Price', 'سعر')} : <strong>{product.offer_price}</strong> {t('LE', 'جنية')}
                </span>
            </span>
            <button className="btn btn-outline-danger">{t('This product is not exists', 'هذا المنتج غير متوافر')}</button>
        </li>
    )
}