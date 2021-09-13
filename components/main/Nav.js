import React, { useState } from 'react'
import Link from 'next/link'
export default function Nav({ setPopup }) {
    const [expand, setExpand] = useState(false);
    const [escape, setEscape] = useState(false);
    return (
        <nav className="d-flex justify-content-between">
            <div onClick={() => { setEscape(false); setPopup(false); setExpand(false) }} className={`escape-effect ${escape ? 'active' : ''} ${expand ? 'active' : ''}`}></div>
            <div className="d-flex align-items-center">
                <div onClick={() => setExpand(!expand)} className={`bars ${expand ? 'nav-bar' : ''}`}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className={`logo ${expand ? 'nav-bar' : ''}`}>
                    <h2>Mall</h2>
                </div>
                <div id="nav-bar" className={expand ? 'active' : ''}>
                    <ul>
                        <li>
                            <Link href="/dashboard">
                                <a className="active">Dashboard</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/product">
                                <a>Product</a>
                            </Link>
                        </li>
                        <li>
                            <a href=""><i className="fas fa-shopping-basket"></i> Categories</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="d-flex align-items-center user-cart">
                <form id="search" className="search">
                    <input id="search-input" type="text" name="search" placeholder="Search" />
                    <i className="fas fa-search"></i>
                </form>
                <div className="circle search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <div className="circle cart">
                    <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="circle user" onClick={() => { setEscape(true); setPopup(true) }}>
                    <i className="fas fa-user"></i>
                </div>
            </div>
        </nav>
    )
}
