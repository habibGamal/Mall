import React, { useEffect, useRef, useState } from 'react'
import Product from './Product'

export default function Products() {
    const row = useRef();
    const [arrow,setArrows] = useState({left:false,right:true})
    function toRight(){
        let element = row.current
        element.scrollTo({
            left:element.scrollLeft + element.clientWidth,
            behavior: 'smooth'
        })
    }
    function toLeft(){
        let element = row.current
        element.scrollTo({
            left:element.scrollLeft - element.clientWidth,
            behavior: 'smooth'
        })
    }
    function scrolled(){
        let element = row.current
        let [scrollWidth,scrollLeft,width] = [element.scrollWidth, element.scrollLeft,element.clientWidth];
        console.log(scrollWidth,scrollLeft,width);
        if(scrollLeft === scrollWidth-width){
            setArrows(old => ({
                left: old.left,
                right: false
            }))
        }
        if(scrollLeft < scrollWidth-width){
            setArrows(old => ({
                left: old.left,
                right: true
            }))
        }
        if(scrollLeft === 0){
            setArrows(old => ({
                left: false,
                right: old.right
            }))
        }
        if(scrollLeft > 0){
            setArrows(old => ({
                left: true,
                right: old.right
            }))
        }
    }
    return (
        <section className="products">
            <div className="container">
                <h2>Top Sales</h2>
                <div className="row-show-container">
                    <div onClick={toLeft} className={`left-arrow ${arrow.left? 'active':''}`}>
                        <i className="fas fa-arrow-circle-left"></i>
                    </div>
                    <div onClick={toRight} className={`right-arrow ${arrow.right? 'active':''}`}>
                        <i className="fas fa-arrow-circle-right"></i>
                    </div>
                    <div ref={row} onScroll={scrolled} className="row-show mt-3">
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Blouse"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
