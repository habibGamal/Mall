import React from 'react'
import { connect } from 'react-redux';
import active from '../../helpers/active';

function OrderProgress({ show, keyPopup, id }) {
    return (
        <div className={active(show(keyPopup), { defaultClass: 'popup edit-category' })}>
            <h1>Order {id}</h1>
        </div>
    )
}


const mapStateToProps = state => ({
    show: (key: string) => state.popup[key],
})

export default connect(mapStateToProps)(OrderProgress);
