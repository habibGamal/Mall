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
import Order from "../../models/Order";
import Product from "../../models/Product";

import { Popup } from '../../redux/dispatcher';
export default function UserOrders() {
    const [orders, setOrders] = useState([] as Array<Order>);
    const [loading, setLoading] = useState(false);
    
    async function cancelOrder(id: number) {
        const res = await orderApi.cancelOrder(id);
        if(res.status === 200){
            setOrders(
                oldOrders => oldOrders.filter(order => order.id !== id)
            )
        }
    }
    useEffect(() => {
        const getOrders = async () => {
            const res = await orderApi.getOrdersForUser();
            if (res.status == 200) {
                console.log(res.data);
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
                    <h2>Your Orders ({orders.length})</h2>
                    <Loading state={loading} mini={true}>
                        {
                            orders.length == 0 ?
                            <Empty msg="You didn't made any orders yet"/>
                            :
                            orders.map(
                                order => (<OrderComponent key={order.id} order={order} cancelOrder={cancelOrder}/>)
                            )
                        }
                    </Loading>
                </div>
            </div>
        </section>
    )
}

function OrderComponent({ order,cancelOrder }: { order: Order,cancelOrder:Function }) {
    const [totalCost,setTotalCost] = useState(order.total_cost); // because total_cost change when we remove a product
    const [products, setProducts] = useState(order.products);
    function showProgress() {
        Popup.setPopup('order-progress', true);
    }
    async function removeProduct(id: number) {
        const res = await orderApi.removeProductFromOrder(id,order.id);
        if(res.status === 200){
            // no products in the order => mean that order is canceld
            if(products.length == 1){
                cancelOrder(order.id);
                return;
            }
            setProducts(
                oldProducts => oldProducts.filter(product => product.id !== id)
            )
            setTotalCost(
                res.data.total_cost
            )
        }
    }
    return (
        <>
            <PopupComponent keyPopup="order-progress">
                <OrderProgress keyPopup="order-progress" id={order.id} />
            </PopupComponent>
            <div className="order">
                {
                    products.map(
                        product => <OrderItem key={product.id * order.id} product={product} removeProduct={removeProduct} />
                    )
                }
                <div className="details">
                    <span>Arrive date: <strong>2022/1/9</strong></span>
                    <span>Order date: <strong>{order.created_at}</strong></span>
                    <span>Total cost : <strong>{totalCost}</strong> LE</span>
                    <button onClick={()=>cancelOrder(order.id)} className="btn btn-danger">Cancel the order</button>
                </div>
                <button onClick={showProgress} className="btn btn-primary">Track Order</button>
            </div>
        </>
    )
}

function OrderItem({ product, removeProduct }: { product: Product, removeProduct: Function }) {
    const {id,name} = product.branches[0];
    
    return (<div className="order-item">
        <div className="picture">
            <img src={product.picture.path} className="img"></img>
        </div>
        <div className="details">
            <span className="sold-by">Sold by <Link href={`/branch/${id}`}>{name}</Link></span>
            <span className="name"><Link href={`/product/${product.id}`}>{product.name}</Link></span>
            <div className="interact">
                <span>Price : <strong>{product.price}</strong> LE</span>
                <span>Number of pieces : <strong>{product.pivot.product_count}</strong></span>
                <button onClick={() => removeProduct(product.id)} className="btn btn-outline-danger">Remove item from the order</button>
            </div>
        </div>
    </div>)
}