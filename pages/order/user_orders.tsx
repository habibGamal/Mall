import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import orderApi from "../../api/order";
import { BackendOrder } from "../../BackendTypes/BackendOrder";
import BackendProduct from "../../BackendTypes/BackendProduct";
import Empty from "../../components/general/Empty";
import OrderProgress from "../../components/popup/OrderProgress";
import PopupComponent from '../../components/popup/Popup'
import Loading from "../../directives/Loading";
import active from "../../helpers/active";
import t, { translate } from "../../helpers/translate";
import Order from "../../models/Order";
import OrderedItem from "../../models/OrderedItem";

import { Popup } from '../../redux/dispatcher';
function UserOrders() {
    const [orders, setOrders] = useState([] as Array<Order>);
    const [loading, setLoading] = useState(false);

    function cancelOrder(id: number) {
        setOrders(
            oldOrders => oldOrders.filter(order => order.id !== id)
        )
    }
    useEffect(() => {
        const getOrders = async () => {
            const res = await orderApi.getOrdersForUser();
            if (res.status == 200) {
                setOrders(res.data.map((order: BackendOrder) => new Order(order)));
                setLoading(true);
            }
        }
        getOrders();
    }, []);

    return (
        <section className="orders-page">
            <div className="container">
                <div className="orders">
                    <h2>{t('Your Orders', 'طلباتك')} ({orders.length})</h2>
                    <Loading state={loading} mini={true}>
                        {
                            orders.length == 0 ?
                                <Empty msg={t('You didn\'t made any orders yet', 'انت لم تطلب اي شئ بعد')} />
                                :
                                orders.map(
                                    order => (<OrderComponent key={order.id} order={order} cancelOrder={cancelOrder} />)
                                )
                        }
                    </Loading>
                </div>
            </div>
        </section>
    )
}
export default connect(translate)(UserOrders);

function OrderComponent({ order, cancelOrder }: { order: Order, cancelOrder: Function }) {
    const [orderState, setOrderState] = useState(order.status);
    const [items, setItems] = useState(order.items);
    function showProgress() {
        Popup.setPopup(`order-progress-${order.id}`, true);
    }
    async function acceptConflict() {
        const res = await orderApi.proccedAfterConflict(order.id);
        if (res.status == 200) {
            setItems(
                oldItems => oldItems.filter(item => item.state !== 'reject')
            )
            setOrderState('accept');
        }
    }
    async function refuseConflict() {
        const res = await orderApi.refuseOrderAfterConflict(order.id);
        if (res.status == 200) {
            cancelOrder(order.id);
        }
    }
    async function removeOrder() {
        const res = await orderApi.cancelOrder(order.id);
        if (res.status === 200) {
            cancelOrder(order.id);
        }
    }
    return (
        <>
            <PopupComponent keyPopup={`order-progress-${order.id}`}>
                <OrderProgress keyPopup={`order-progress-${order.id}`} status={order.status} />
            </PopupComponent>
            <div className="order">
                {
                    items.map(
                        item => <OrderItem key={item.id * order.id} item={item} />
                    )
                }
                <div className="details">
                    <span>{t('Arrive date', 'تاريخ الوصول')}: <strong>2022/1/9</strong></span>
                    <span>{t('Order date', 'تاريخ الطلب')}: <strong>{order.created_at}</strong></span>
                    <span>{t('Total cost', 'التكلفة الكلية')}: <strong>{order.total_cost}</strong> {t('LE', 'جنية')}</span>
                    {
                        orderState != 'conflict' ?
                            <button onClick={removeOrder} className="btn btn-icon btn-light"><i className="fas fa-trash-alt"></i>{t('Cancel the order', 'الغاء الطلب')}</button>
                            : ''
                    }
                </div>
                {
                    orderState == 'conflict' ?
                        <div className="conflict">
                            <p className="labelled-info mx-3">You can procced the order and remove the rejected items or Cancle the order ?</p>
                            <div className="buttons">
                                <button onClick={refuseConflict} className="btn btn-danger">{t('Cancle Order', 'الغاء الطلب')}</button>
                                <button onClick={acceptConflict} className="btn btn-primary">{t('Continue Order', 'استكمال الطلب')}</button>
                            </div>
                        </div>
                        : <button onClick={showProgress} className="btn btn-primary">{t('Track Order', 'تابع الطلب')}</button>
                }
            </div>
        </>
    )
}

function OrderItem({ item }: { item: OrderedItem }) {
    const { id, name } = item.branch;
    const { product } = item;
    return (
        <div className={'order-item ' + active(item.state == 'accept', { activeClass: 'accepted' }) + active(item.state == 'reject', { activeClass: 'rejected' })}>
            <div className="picture">
                <img src={product.picture.path} className="img"></img>
            </div>
            <div className="details">
                <span className="sold-by">{t('Sold by', 'صاحب المنتج')}  <Link href={`/branch/${id}`}>{name}</Link></span>
                <span className="name"><Link href={`/product/${product.id}`}>{product.name}</Link></span>
                <div className="interact">
                    <span>{t('Price', 'السعر')} : <strong>{product.offer_price}</strong> {t('LE', 'جنية')}</span>
                    <span>{t('Number of pieces', 'عدد القطع')} : <strong>{item.count}</strong></span>
                    <div className="state">
                        <span>{item.state}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}