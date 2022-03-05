import React, { useEffect, useReducer, useRef } from 'react'
import { connect } from 'react-redux';
import order from '../../api/order';
import active from '../../helpers/active';

function OrderProgress({ show, keyPopup, status }) {
    const progressBar = useRef<HTMLDivElement>(null);
    function progressState() {
        switch (status) {
            case 'accept':
                return {
                    accepted: true,
                    delevering: false,
                    received: false,
                    factor:1,
                }
            case 'delevering':
                return {
                    accepted: true,
                    delevering: true,
                    received: false,
                    factor:2,
                }
            case 'received':
                return {
                    accepted: true,
                    delevering: false,
                    received: true,
                    factor:3,
                }
            default:
                return {
                    accepted: false,
                    delevering: false,
                    received: false,
                    factor:0,
                }
        }
    }
    const progress = progressState();
    useEffect(() => {
        if(progress){
            progressBar.current.style.setProperty('--factor', progress.factor.toString());
        }
    }, [])
    return (
        <div className={active(show(keyPopup), { defaultClass: 'popup order-progress' })}>
            <div className="states">
                <div className="progress">
                    <div ref={progressBar} className="progress-bar" role="progressbar" aria-valuenow={90}
                        aria-valuemin={0} aria-valuemax={100}>
                        <span className="sr-only">70% Complete</span>
                    </div>
                </div>
                <div className="state-name">
                    <div className="state done">
                        <i className="fas fa-clock"></i>
                    </div>
                    <span>Pending</span>
                </div>
                <div className="state-name">
                    <div className={active(progress.accepted,{activeClass:'done',defaultClass:'state'})}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <span>Order accepted</span>
                </div>
                <div className="state-name">
                    <div className={active(progress.delevering,{activeClass:'done',defaultClass:'state'})}>
                        <i className="fas fa-shipping-fast"></i>
                    </div>
                    <span>Delevering</span>
                </div>
                <div className="state-name">
                    <div className={active(progress.received,{activeClass:'done',defaultClass:'state'})}>
                        <i className="fas fa-people-carry"></i>
                    </div>
                    <span>Order Received</span>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    show: (key: string) => state.popup[key],
})

export default connect(mapStateToProps)(OrderProgress);
