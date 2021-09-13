import React, { useRef, useState } from 'react'
import Link from 'next/link'
import active from '../helpers/active'
import ProductControlPanel from '../components/control-panel/ProductControlPanel'
export default function Product() {
    const show = useRef();
    const [sizeOption, setSizeOption] = useState(0);
    const [colorOption, setColorOption] = useState(0);
    const [pictureShow, setPictureShow] = useState(0);
    const [like, setLike] = useState(false);
    function showScroll(e){
        const showW = show.current.clientWidth;
        const n = show.current.scrollLeft/(showW+16);
        const to = (i) => show.current.scrollTo({
            left: (showW+16)*i,
            behavior: 'smooth'
        })
        const x = e.clientX >= show.current.offsetLeft && e.clientX < (show.current.offsetLeft + showW*.5) ;
        const next = (i)=>(i-1 <= n && n < i) ? to(i):undefined;
        const back = (i)=>(i < n && n <= i+1) ? to(i):undefined;
        if(x){
            // back
            for(let i = 0;i <= show.current.children.length -2;i++){
                back(i);
            }
        }else{
            // next
            for(let i = 1;i <= show.current.children.length -1;i++){
                next(i);
            }
        }
        console.log(e.clientX , show.current.offsetLeft , showW);
    }
    function activeSize(index) {
        return active(sizeOption === index, { defaultClass: 'option' })
    }
    function activeColor(index) {
        return active(colorOption === index, { defaultClass: 'option' })
    }
    function activePicture(index,obj={}) {
        return active(pictureShow === index, obj)
    }
    return (
        <>
            <section className="single-product">
                <div className="container">
                    <div className="product">
                        <div className="path">
                            <a className="store-logo" href="/store">
                                <img src="/images/logo_1.jpg" />
                            </a>
                            <div className="category-path">
                                <Link href="/category">
                                    Fashion
                                </Link>
                                {/* {`&#x2192;`} */}
                                <Link href="/category">
                                    Men
                                </Link>
                            </div>
                        </div>
                        <div className="content">
                            <div className="pictures">
                                <div className="mini">
                                    <div className={activePicture(0,{defaultClass:'picture'})} onClick={() => setPictureShow(0)}>
                                        <img src="/images/cat_1.jpg" alt="" />
                                    </div>
                                    <div className={activePicture(1,{defaultClass:'picture'})} onClick={() => setPictureShow(1)}>
                                        <img src="/images/cat_2.jpg" alt="" />
                                    </div>
                                    <div className={activePicture(2,{defaultClass:'picture'})} onClick={() => setPictureShow(2)}>
                                        <img src="/images/cat_3.jpg" alt="" />
                                    </div>
                                </div>
                                <div ref={show} onClick={showScroll} className="show">
                                    <div className={activePicture(0)}>
                                        <img src="/images/cat_1.jpg" alt="" />
                                    </div>
                                    <div className={activePicture(1)}>
                                        <img src="/images/cat_2.jpg" alt="" />
                                    </div>
                                    <div className={activePicture(2)}>
                                        <img src="/images/cat_3.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="details">
                                <h2>Shop Name</h2>
                                <h3>Pocket T-shirt</h3>
                                <div className="price block">
                                    <h4>Price</h4>
                                    <div className="context">
                                        <del>250 EL</del><span> 200 El</span>
                                    </div>
                                </div>
                                <div className="block">
                                    <h4>Available Size</h4>
                                    <div className="context">
                                        <span onClick={() => setSizeOption(0)} className={activeSize(0)}>L</span>
                                        <span onClick={() => setSizeOption(1)} className={activeSize(1)}>XL</span>
                                    </div>
                                </div>
                                <div className="block">
                                    <h4>Available Colors</h4>
                                    <div className="context">
                                        <span onClick={() => setColorOption(0)} className={activeColor(0)}>orange</span>
                                        <span onClick={() => setColorOption(1)} className={activeColor(1)}>red</span>
                                    </div>
                                </div>
                                <div className="interact block">
                                    <h4>Interact</h4>
                                    <div className="context">
                                        <div onClick={() => setLike(!like)} className={active(like, { activeClass: 'like', defaultClass: 'option' })}>22 <i className="fas fa-heart"></i></div>
                                        <button className="btn btn-secondary">Comment</button>
                                        <button className="btn btn-dark">Ask if still exist</button>
                                    </div>
                                </div>
                                <div className="block">
                                    <h4>Quantity</h4>
                                    <div className="context">
                                        <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-warning">Save to wish list</button>
                                        <button className="btn btn-success">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="extra">
                        <ProductControlPanel />
                    </div>
                </div>
            </section>
        </>
    )
}
