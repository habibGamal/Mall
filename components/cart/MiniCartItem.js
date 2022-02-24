import React, { useEffect } from 'react'
import Image from 'next/image'
import Select from '../inputs/Select'
import cart from '../../api/cart';
import { connect } from 'react-redux';
import { $Async } from '../../redux/async_actions';
import t from '../../helpers/translate';

function CartItem({ src, id, formKey, name, price, quantity, getInputValue }) {
    useEffect(async () => {
        // => change the quantity of the item
        // let res = await cart.increaseItemQuantity(id,{product_count:getInputValue(formKey,id),'_method':'PUT'});
        $Async.UpdateCartItem(id, getInputValue(formKey, id) ?? null);
    }, [getInputValue(formKey, id)]);
    async function deleteItem() {
        $Async.RemoveCartItem(id);
    }
    return (
        <div className="cart-item">
            <div onClick={deleteItem} className="close">
                <i className="fas fa-times"></i>
            </div>
            <div className="picture">
                <Image width={200} height={350} src={src} className="img" />
            </div>
            <div className="details">
                <span>{name}</span>
                <span>{t('Price','السعر')} : <strong>{price}</strong> {t('LE','جنية')}</span>
                <Select
                    label={t('Quantity','الكمية')}
                    type="select"
                    name={id}
                    formKey={formKey}
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


const mapStateToProps = state => ({
    getInputValue: (formKey, name) => {
        return state.forms[formKey]?.[name];
    },
})
export default connect(mapStateToProps)(CartItem);
