import React, { useEffect, useRef, useState } from 'react'
import RowScroll from '../general/RowScroll'
import Product from './Product'

export default function Products() {
    // const row = useRef();
    // const [arrow,setArrow] = useState({left:false,right:true})
    // function toRight(){
    //     let element = row.current
    //     element.scrollTo({
    //         left:element.scrollLeft + element.clientWidth,
    //         behavior: 'smooth'
    //     })
    // }
    // function toLeft(){
    //     let element = row.current
    //     element.scrollTo({
    //         left:element.scrollLeft - element.clientWidth,
    //         behavior: 'smooth'
    //     })
    // }
    // function scrolled(){
    //     let element = row.current
    //     let [scrollWidth,scrollLeft,width] = [element.scrollWidth, element.scrollLeft,element.clientWidth];
    //     console.log(scrollWidth,scrollLeft,width);
    //     if(scrollLeft === scrollWidth-width){
    //         setArrow(old => ({
    //             left: old.left,
    //             right: false
    //         }))
    //     }
    //     if(scrollLeft < scrollWidth-width){
    //         setArrow(old => ({
    //             left: old.left,
    //             right: true
    //         }))
    //     }
    //     if(scrollLeft === 0){
    //         setArrow(old => ({
    //             left: false,
    //             right: old.right
    //         }))
    //     }
    //     if(scrollLeft > 0){
    //         setArrow(old => ({
    //             left: true,
    //             right: old.right
    //         }))
    //     }
    // }
    return (
        <section className="products">
            <div className="container">
                <h2>Top Sales</h2>
                <RowScroll>
                        <Product 
                            name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
                            price="250"
                            offerPrice="200"
                            currency="LE"
                            src="./images/cat_5.jpg"
                            href="/products"
                        />
                        <Product 
                            name="Front Pocket T-Shirt in White 
                            Onyx White/Enamel Blue"
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
                </RowScroll>     
            </div>
        </section>
    )
}
