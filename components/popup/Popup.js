import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active'
import { initPopup, setPopup, uninstallPopup } from '../../redux/actions/popup';
function Popup({ keyPopup, children, show, initPopup, setPopup ,uninstallPopup }) {
    const router = useRouter();
    useEffect(() => {
        initPopup(keyPopup);
        const handleRouteChange = (url) => {
            if (!url.includes('popup=true')) {
                setPopup(keyPopup, false);
            }
        }
        router.events.on('routeChangeStart', handleRouteChange);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            uninstallPopup(keyPopup);
        }
    }, [])
    function escapeEffect() {
        setPopup(keyPopup, false);
        if(router.query.hasOwnProperty('popup')){
            router.push({ query: {} })
        }
    }
    return (
        <>
            <div onClick={escapeEffect} className={active(show(keyPopup), { defaultClass: 'escape-effect' })}></div>
            {children}
        </>
    )
}
const mapStateToProps = state => ({
    show: (key) => state.popup[key],
})
export default connect(mapStateToProps, { initPopup, setPopup , uninstallPopup })(Popup);