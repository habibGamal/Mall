import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import active from '../../helpers/active'
import { Popup as Pop } from '../../redux/dispatcher';

function Popup({ keyPopup, children, show }) {
    const router = useRouter();
    useEffect(() => {
        // => registing the key of popup in the global state
        Pop.init(keyPopup);
        // => if the user hits back button in browser will remove the popup
        const handleRouteChange = (url) => {
            if (!url.includes('popup=true')) {
                Pop.setPopup(keyPopup, false);
            }
        }
        router.events.on('routeChangeStart', handleRouteChange);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            Pop.uninstallPopup(keyPopup);
        }
    }, [])
    useEffect(() => {
        // => push a query popup if the user click on it
        if (show(keyPopup) && router.query.popup === undefined) {
            router.push({ query: { ...router.query, popup: true } }, null, { scroll: false })
        }
    }, [show(keyPopup)])
    function escapeEffect() {
        Pop.setPopup(keyPopup, false);
        router.beforePopState((state) => {
            state.options.scroll = false;
            return true;
        });
        router.back();
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
export default connect(mapStateToProps)(Popup);