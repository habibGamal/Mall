import React, { useEffect, useReducer, useRef, useState } from 'react'
import Link from 'next/link'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
import NavCategory from './NavCategory';
import MiniCart from '../cart/MiniCart';
import Authenticated from '../../directives/Authenticated';
import authApi from '../../api/auth';
import { connect } from 'react-redux';
import { $Async } from '../../redux/async_actions';
import { Language, Popup } from '../../redux/dispatcher';
import t from '../../helpers/translate';
import Unauthenticated from '../../directives/Unauthenticated';
import Notifications from '../notifications/Notifications';
function Nav({ setPopupForm, auth }) {

    function switchLanguge(lang: string) {
        if (lang == 'en') {
            document.documentElement.dir = 'ltr';
        }
        if (lang == 'ar') {
            document.documentElement.dir = 'rtl';
        }
        Language.setLanguage(lang);
    }

    const router = useRouter();
    const search = useRef<HTMLInputElement>();
    const activeLink = useRef<HTMLAnchorElement>();
    const ACTIONS = {
        EXPAND_NAV: 'EXPAND_NAV',
        EXPAND_CART: 'EXPAND_CART',
        EXPAND_NOTIFI: 'EXPAND_NOTIFI',
        ESCAPE: 'ESCAPE',
        SEARCH_T: 'SEARCHT',
        LOGIN_T: 'LOGINT'
    }
    const initialState = {
        expandNav: false,
        expandCart: false,
        expandNotifi: false,
        escape: false,
        searchT: false,
    }
    const reducer = (state: {
        expandNav: boolean,
        expandCart: boolean,
        expandNotifi: boolean,
        escape: boolean,
        searchT: boolean,
    }, action: { type: string }) => {
        switch (action.type) {
            case ACTIONS.EXPAND_NAV:
                return { ...state, expandNav: !state.expandNav, escape: !state.expandNav };
            case ACTIONS.EXPAND_CART:
                return { ...state, expandCart: !state.expandCart, escape: !state.expandCart };
            case ACTIONS.EXPAND_NOTIFI:
                return { ...state, expandNotifi: !state.expandNotifi, escape: !state.expandNotifi };
            case ACTIONS.ESCAPE:
                return {
                    ...state,
                    expandNav: false,
                    expandCart: false,
                    expandNotifi: false,
                    searchT: false,
                    escape: false
                }
            case ACTIONS.SEARCH_T:
                return {
                    ...state,
                    escape: true,
                    searchT: true
                }
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    function loginPopup() {
        setPopupForm(true);
    }
    function escapeEffect() {
        dispatch({ type: ACTIONS.ESCAPE });
    }
    function navLink(e) {
        escapeEffect();
        activeLink.current.classList.remove('active');
        e.target.classList.add('active');
        activeLink.current = e.target;
    }
    // api section
    async function logout() {
        escapeEffect();
        if (auth.user)
            await authApi.logout().then(res => console.log(res));
        if (auth.admin)
            await authApi.adminLogout().then(res => console.log(res));
        $Async.Reauth();
        router.push('/');
    }
    useEffect(() => {
        window.onscroll = () => {
            if (document.body.scrollHeight >= (window.innerHeight + 100)) {
                if (window.scrollY > 0) {
                    document.getElementsByTagName('nav')[0]?.classList.add('stick');
                } else {
                    document.getElementsByTagName('nav')[0]?.classList.remove('stick');
                }
            }
            if (window.scrollY == 0) {
                document.getElementsByTagName('nav')[0]?.classList.remove('stick');
            }
        }
        return () => {
            window.onscroll = () => { }
        };
    }, []);
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
                                    <a ref={activeLink} onClick={navLink} className="active">{t('Home', 'الرئيسية')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/product/create">
                                    <a onClick={navLink}>{t('Create Product', 'انشاء منتج')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard">
                                    <a onClick={navLink}>{t('Dashboard', 'لوحة التحكم')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/store">
                                    <a onClick={navLink}>{t('Store', 'متجر')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/store/create">
                                    <a onClick={navLink}>{t('Create Store', 'انشاء متجر')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/branch/create">
                                    <a onClick={navLink}>{t('Create Branch', 'انشاء فرع')}</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/order/user_orders">
                                    <a onClick={navLink}>{t('My Orders', 'طلباتي')}</a>
                                </Link>
                            </li>
                            <li className="select-language">
                                <span>{t('Current language', 'اللغة المستخدمة')} : <span className="current-language">English</span></span>
                                <div className="switch">
                                    <span onClick={() => switchLanguge('ar')}>Arabic</span>
                                    <span onClick={() => switchLanguge('en')} className="current-language">English</span>
                                </div>
                            </li>
                        </ul>
                        <div className="options">
                            <Authenticated>
                                <div className="logout" onClick={logout}>
                                    <i className="fas fa-sign-out-alt"></i><span>{t('Logout', 'تسجيل الخروج')}</span>
                                </div>
                            </Authenticated>
                        </div>
                    </div>
                    <MiniCart
                        expand={state.expandCart}
                        close={() => dispatch({ type: ACTIONS.ESCAPE })}
                    />
                </div>
                <div className="d-flex align-items-center user-cart">
                    <form className={active(state.searchT, { defaultClass: 'search' })}>
                        <input ref={search} id="search-input" type="text" name="search" placeholder={t('Search', 'بحث')} />
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
                    <Authenticated guard='user'>
                        <div className="circle cart" onClick={() => dispatch({ type: ACTIONS.EXPAND_CART })}>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="count">3</span>
                        </div>
                    </Authenticated>
                    <Unauthenticated>
                        <div className="circle user" onClick={loginPopup}>
                            <i className="fas fa-user"></i>
                        </div>
                    </Unauthenticated>
                    <Authenticated>
                        <Notifications show={state.expandNotifi} onClick={() => dispatch({ type: ACTIONS.EXPAND_NOTIFI })} />
                    </Authenticated>
                </div>
            </nav>
            <ul className="nav-categories d-none">
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

const mapDispatchToProps = dispatch => (
    {
        setPopupForm: (value) => Popup.setPopup('auth-form', value),
    }
)

const mapStateToProps = state => ({
    auth: state.main.authenticated,
    lang: state.translate.language
})
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
