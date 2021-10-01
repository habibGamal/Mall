import React, { useRef, useState } from 'react'

export default function RowScroll({children}) {
    const row = useRef();
    const [arrow, setArrow] = useState({ left: false, right: true })
    function toRight() {
        let element = row.current
        element.scrollTo({
            left: element.scrollLeft + element.clientWidth,
            behavior: 'smooth'
        })
    }
    function toLeft() {
        let element = row.current
        element.scrollTo({
            left: element.scrollLeft - element.clientWidth,
            behavior: 'smooth'
        })
    }
    function scrolled() {
        let element = row.current
        let [scrollWidth, scrollLeft, width] = [element.scrollWidth, element.scrollLeft, element.clientWidth];
        if (scrollLeft === scrollWidth - width) {
            setArrow(old => ({
                left: old.left,
                right: false
            }))
        }
        if (scrollLeft < scrollWidth - width) {
            setArrow(old => ({
                left: old.left,
                right: true
            }))
        }
        if (scrollLeft === 0) {
            setArrow(old => ({
                left: false,
                right: old.right
            }))
        }
        if (scrollLeft > 0) {
            setArrow(old => ({
                left: true,
                right: old.right
            }))
        }
    }
    return (
        <div className="row-show-container">
            <div onClick={toLeft} className={`left-arrow ${arrow.left ? 'active' : ''}`}>
                <i className="fas fa-arrow-circle-left"></i>
            </div>
            <div onClick={toRight} className={`right-arrow ${arrow.right ? 'active' : ''}`}>
                <i className="fas fa-arrow-circle-right"></i>
            </div>
            <div ref={row} onScroll={scrolled} className="row-show">
                {children}
            </div>
        </div>
    )
}
