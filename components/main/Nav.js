import React, { useEffect, useReducer, useRef, useState } from 'react'
import Link from 'next/link'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
import NavCategory from './NavCategory';
import CartItem from '../cart/MiniCartItem';
import MiniCart from '../cart/MiniCart';
export default function Nav({ setPopup }) {
    const router = useRouter();
    const search = useRef();
    const activeLink = useRef();
    const ACTIONS = {
        EXPAND_NAV: 'EXPAND_NAV',
        EXPAND_CART: 'EXPAND_CART',
        ESCAPE: 'ESCAPE',
        SEARCH_T: 'SEARCHT',
        LOGIN_T: 'LOGINT'
    }
    const initialState = {
        expandNav: false,
        expandCart: false,
        escape: false,
        searchT: false,
    }
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.EXPAND_NAV:
                return { ...state, expandNav: !state.expandNav, escape: !state.expandNav };
            case ACTIONS.EXPAND_CART:
                return { ...state, expandCart: !state.expandCart, escape: !state.expandCart };
            case ACTIONS.ESCAPE:
                return {
                    ...state,
                    expandNav: false,
                    expandCart: false,
                    searchT: false,
                    escape: false
                }
            case ACTIONS.SEARCH_T:
                return {
                    ...state,
                    escape: true,
                    searchT: true
                }
            case ACTIONS.LOGIN_T:
                return {
                    ...state,
                    escape: true
                }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const handleRouteChange = (url) => {
            if (!url.includes('popup=true')) {
                setPopup(false);
                dispatch({ type: ACTIONS.ESCAPE });
            }
        }
        router.events.on('routeChangeStart', handleRouteChange);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])
    function loginPopup() {
        setPopup(true);
        dispatch({ type: ACTIONS.LOGIN_T });
        router.push({ query: { popup: true } })
    }
    function escapeEffect() {
        setPopup(false);
        dispatch({ type: ACTIONS.ESCAPE });
        router.push({ query: {} })
    }
    function navLink(e) {
        escapeEffect();
        activeLink.current.classList.remove('active');
        e.target.classList.add('active');
        activeLink.current = e.target;
    }
    return (
        <>
            <nav className="d-flex justify-content-between">
                <div onClick={escapeEffect} className={active(state.escape, { defaultClass: 'escape-effect' })}></div>
                <div className="d-flex align-items-center">
                    <div onClick={() => dispatch({ type: ACTIONS.EXPAND_NAV })} className={active(state.expandNav, { activeClass: 'nav-bar', defaultClass: 'bars' })}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <div className={active(state.expandNav, { activeClass: 'nav-bar', defaultClass: 'logo' })}>
                        <Link href="/">
                            <a>
                                <h2>Mall</h2>
                            </a>
                        </Link>
                    </div>
                    <div id="nav-bar" className={active(state.expandNav)}>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a ref={activeLink} onClick={navLink} className="active">Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/create-product">
                                    <a onClick={navLink}>Create Product</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard">
                                    <a onClick={navLink}>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/product">
                                    <a onClick={navLink}>Product</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/category">
                                    <a onClick={navLink}>Category</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/store">
                                    <a onClick={navLink}>Store</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <MiniCart 
                        expand={state.expandCart}
                        close={() => dispatch({ type: ACTIONS.ESCAPE })}
                    />
                </div>
                <div className="d-flex align-items-center user-cart">
                    <form className={active(state.searchT, { defaultClass: 'search' })}>
                        <input ref={search} id="search-input" type="text" name="search" placeholder="Search" />
                        <i className="fas fa-search"></i>
                    </form>
                    <div
                        onClick={
                            async () => {
                                await dispatch({ type: ACTIONS.SEARCH_T });
                                search.current.focus();
                            }
                        }
                        className="circle search-icon"
                    >
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="circle cart" onClick={()=>dispatch({type:ACTIONS.EXPAND_CART})}>
                        <i className="fas fa-shopping-cart"></i>
                        <span className="count">3</span>
                    </div>
                    <div className="circle user" onClick={loginPopup}>
                        <i className="fas fa-user"></i>
                    </div>
                </div>
            </nav>
            <ul className="nav-categories">
                <NavCategory
                    content={<><i className="fas fa-angle-right"></i> All</>}
                    href='/'
                />
                <NavCategory
                    content="Electronics"
                    href='/'
                />
                <NavCategory
                    content="Mobiles"
                    href='/'
                />
                <NavCategory
                    content="Fashion"
                    href='/'
                />
                <NavCategory
                    content="Home Care"
                    href='/'
                />
                <NavCategory
                    content="Video Games"
                    href='/'
                />
            </ul>
        </>
    )
}
