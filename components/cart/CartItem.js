import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Select from '../inputs/Select'
import t, { translate } from '../../helpers/translate'
import { connect } from 'react-redux'

function CartItem({ src, name, price, shopName, quantity }) {
    return (
        <div className="cart-item">
            <div className="picture">
                <img src={src} className="img" />
            </div>
            <div className="details">
                <span className="sold-by">{t('Sold by', 'صاحب المنتج')} <Link href="/store">{shopName}</Link></span>
                <span className="name">{name}</span>
                <div className="interact">
                    <span>{t('Price', 'السعر')} : <strong>{price}</strong> {t('LE', 'جنية')}</span>
                    <Select
                        label={null}
                        addClass=""
                        options={[
                            { value: 1, as: '1' },
                            { value: 2, as: '2' },
                        ]}
                    />
                    <button className="btn btn-warning">{t('Save in wish list','اضافة في قائمة المفضلة')}</button>
                    <button className="btn btn-outline-danger">{t('Remove Item','احذف المنتج')}</button>
                </div>
            </div>
        </div>
    )
}
export default connect(translate)(CartItem)
