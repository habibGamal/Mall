import React, { useCallback, useEffect } from 'react'
import Image from 'next/image'
import Select from '../inputs/Select'
import { connect } from 'react-redux';
import { $Async } from '../../redux/async_actions';
import t from '../../helpers/translate';
import loader from '../../loader';
import CartItemModel from '../../models/CartItem';

function CartItem({ item, itemCount }: { item: CartItemModel, itemCount: number }) {
    const { id, name, picture, quantity, price } = item;
    useEffect(() => {
        // => change the quantity of the item
        if (itemCount && itemCount != quantity) {
                $Async.UpdateCartItem(id, itemCount ?? null) 
        }
    }, [itemCount, quantity,id]);
    async function deleteItem() {
        $Async.RemoveCartItem(id);
    }
    return (
        <div className="cart-item">
            <div onClick={deleteItem} className="close">
                <i className="fas fa-times"></i>
            </div>
            <div className="picture">
                {/* <Image loader={loader} src={picture.path} width={200} height={350} className="img" /> */}
                <img src={picture.path} className="img" />
            </div>
            <div className="details">
                <span>{name}</span>
                <span>{t('Price', 'السعر')} : <strong>{price}</strong> {t('LE', 'جنية')}</span>
                <Select
                    label={t('Quantity', 'الكمية')}
                    name={id.toString()}
                    id={id.toString()}
                    formKey={CartItemModel.formKey}
                    defaultOption={quantity - 1}
                    addClass=""
                    options={[
                        { value: 1, as: '1' },
                        { value: 2, as: '2' },
                    ]}
                />
            </div>
        </div>
    )
}


const mapStateToProps = (state, { item }: { item: CartItemModel }) => ({
    itemCount: state.forms?.[CartItemModel.formKey]?.[item.id],
})
export default connect(mapStateToProps)(CartItem);
