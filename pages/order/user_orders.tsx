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
import t, { translate } from "../../helpers/translate";
import Order from "../../models/Order";
import OrderedItem from "../../models/OrderedItem";
import Product from "../../models/Product";

import { Popup } from '../../redux/dispatcher';
function UserOrders() {
    const [orders, setOrders] = useState([] as Array<Order>);
    const [loading, setLoading] = useState(false);

    async function cancelOrder(id: number) {
        const res = await orderApi.cancelOrder(id);
        if (res.status === 200) {
            setOrders(
                oldOrders => oldOrders.filter(order => order.id !== id)
            )
        }
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
    const [totalCost, setTotalCost] = useState(order.total_cost); // because total_cost change when we remove a product
    const [items, setItems] = useState(order.items);
    function showProgress() {
        Popup.setPopup(`order-progress-${order.id}`, true);
    }
    async function removeItem(id: number) {
        const res = await orderApi.removeProductFromOrder(id, order.id);
        if (res.status === 200) {
            // no products in the order => mean that order is canceld
            if (items.length == 1) {
                cancelOrder(order.id);
                return;
            }
            setItems(
                oldItems => oldItems.filter(item => item.id !== id)
            )
            setTotalCost(
                res.data.total_cost
            )
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
                        item => <OrderItem key={item.id * order.id} item={item} removeItem={removeItem} />
                    )
                }
                <div className="details">
                    <span>{t('Arrive date', 'تاريخ الوصول')}: <strong>2022/1/9</strong></span>
                    <span>{t('Order date', 'تاريخ الطلب')}: <strong>{order.created_at}</strong></span>
                    <span>{t('Total cost', 'التكلفة الكلية')}: <strong>{totalCost}</strong> {t('LE', 'جنية')}</span>
                    <button onClick={() => cancelOrder(order.id)} className="btn btn-danger">{t('Cancel the order', 'الغاء الطلب')}</button>
                </div>
                <button onClick={showProgress} className="btn btn-primary">{t('Track Order', 'تابع الطلب')}</button>
            </div>
        </>
    )
}

function OrderItem({ item, removeItem }: { item: OrderedItem, removeItem: Function }) {
    const { id, name } = item.branch;
    const { product } = item;

    return (<div className="order-item">
        <div className="picture">
            <img src={product.picture.path} className="img"></img>
        </div>
        <div className="details">
            <span className="sold-by">{t('Sold by', 'صاحب المنتج')}  <Link href={`/branch/${id}`}>{name}</Link></span>
            <span className="name"><Link href={`/product/${product.id}`}>{product.name}</Link></span>
            <div className="interact">
                <span>{t('Price', 'السعر')} : <strong>{product.price}</strong> {t('LE', 'جنية')}</span>
                <span>{t('Number of pieces', 'عدد القطع')} : <strong>{item.count}</strong></span>
                <button onClick={() => removeItem(item.id)} className="btn btn-outline-danger">{t('Remove item from the order', 'احذف المنتج من الطلب')}</button>
            </div>
        </div>
    </div>)
}