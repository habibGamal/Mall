import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import active from '../../helpers/active';
import { useRouter } from 'next/dist/client/router';
import NavCategory from './NavCategory';
export default function Nav({ setPopup }) {
    const router = useRouter();
    const search = useRef();
    const [expand, setExpand] = useState(false);
    const [escape, setEscape] = useState(false);
    const [searchT, setSearchT] = useState(false);
    const activeLink = useRef();
    useEffect(() => {
        const handleRouteChange = (url) => {
            if (!url.includes('popup=true')) {
                setEscape(false);
                setPopup(false);
            }
        }

        router.events.on('routeChangeStart', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])
    function loginPopup() {
        setEscape(true);
        setPopup(true);
        router.push({ query: { popup: true } })
    }
    function escapeEffect() {
        setEscape(false);
        setPopup(false);
        setExpand(false);
        setSearchT(false);
        router.push({ query: {} })
    }
    function navLink(e){
        escapeEffect();
        activeLink.current.classList.remove('active');
        e.target.classList.add('active');
        activeLink.current = e.target;
    }
    return (
        <>
            <nav className="d-flex justify-content-between">
                <div onClick={escapeEffect} className={active(escape || expand || searchT, { defaultClass: 'escape-effect' })}></div>
                <div className="d-flex align-items-center">
                    <div onClick={() => setExpand(!expand)} className={active(expand,{activeClass:'nav-bar',defaultClass:'bars'})}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <div className={active(expand,{activeClass:'nav-bar',defaultClass:'logo'})}>
                        <Link href="/">
                            <a>
                                <h2>Mall</h2>
                            </a>
                        </Link>
                    </div>
                    <div id="nav-bar" className={active(expand)}>
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
                </div>
                <div className="d-flex align-items-center user-cart">
                    <form className={active(searchT, { defaultClass: 'search' })}>
                        <input ref={search} id="search-input" type="text" name="search" placeholder="Search" />
                        <i className="fas fa-search"></i>
                    </form>
                    <div onClick={async () => {
                        await setSearchT(true);
                        search.current.focus();
                    }} className="circle search-icon">
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="circle cart">
                        <i className="fas fa-shopping-cart"></i>
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
