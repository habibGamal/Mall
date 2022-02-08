import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import { translate } from '../../helpers/translate';


function RowScroll({ children, lang }: { children: JSX.Element[], lang: string }) {
    const row = useRef();
    const direction = () => {
        if (lang == 'ar') {
            return { right: false, left: true };
        }
        return { left: false, right: true };
    }
    const [arrow, setArrow] = useState(direction())
    function toRight() {
        const element: HTMLDivElement = row.current
        element.scrollTo({
            left: element.scrollLeft + element.clientWidth,
            behavior: 'smooth'
        })
    }
    function toLeft() {
        const element: HTMLDivElement = row.current
        element.scrollTo({
            left: element.scrollLeft - element.clientWidth,
            behavior: 'smooth'
        })
    }
    function scrolled() {
        let element: HTMLDivElement = row.current
        let [scrollWidth, scrollLeft, width] = [element.scrollWidth, element.scrollLeft, element.clientWidth];

        if (lang == 'en') {
            if (scrollLeft === scrollWidth - width) {
                setArrow(old => ({
                    left: old.left,
                    right: false
                }))
            }
            if (scrollLeft === 0) {
                setArrow(old => ({
                    left: false,
                    right: old.right
                }))
            }
            if (scrollLeft < scrollWidth - width) {
                setArrow(old => ({
                    left: old.left,
                    right: true
                }))
            }
            if (scrollLeft > 0) {
                setArrow(old => ({
                    left: true,
                    right: old.right
                }))
            }
        }
        if (lang == 'ar') {
            if (scrollLeft === 0) {
                setArrow(old => ({
                    right: false,
                    left: old.right
                }))
            }
            if (-scrollLeft > 0) {
                if (-scrollLeft === scrollWidth - width) {
                    setArrow(old => ({
                        right: old.left,
                        left: false
                    }))
                    return;
                }
                setArrow(old => ({
                    left: old.right,
                    right: true
                }))
            }
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

export default connect(translate)(RowScroll)
