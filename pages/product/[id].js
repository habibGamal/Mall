import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import active from '../../helpers/active'
import ProductControlPanel from '../../components/control-panel/ProductControlPanel'
import p from '../../api/product';
import handlePath from '../../helpers/picturePath';
export const getServerSideProps = async (ctx) => {
    try {
        const res = await p.show(ctx.params.id);
        return {
            props: {
                product: res.data
            }
        }
    } catch (err) {
        const status = err.response.status;
        if (status === 404) {
            return {
                notFound: true,
            }
        }
        return {
            notFound: true,
        }
    }
}
function Product({ product }) {
    const show = useRef();
    const [sizeOption, setSizeOption] = useState(0);
    const [colorOption, setColorOption] = useState(0);
    const [pictureShow, setPictureShow] = useState(0);
    const [like, setLike] = useState(false);
    let pictures = JSON.parse(product.pictures);
    function showScroll(e) {
        const showW = show.current.clientWidth;
        const n = show.current.scrollLeft / (showW + 16);
        const to = (i) => show.current.scrollTo({
            left: (showW + 16) * i,
            behavior: 'smooth'
        })
        const x = e.clientX >= show.current.offsetLeft && e.clientX < (show.current.offsetLeft + showW * .5);
        const next = (i) => (i - 1 <= n && n < i) ? to(i) : undefined;
        const back = (i) => (i < n && n <= i + 1) ? to(i) : undefined;
        if (x) {
            // back
            for (let i = 0; i <= show.current.children.length - 2; i++) {
                back(i);
            }
        } else {
            // next
            for (let i = 1; i <= show.current.children.length - 1; i++) {
                next(i);
            }
        }
    }
    function activeSize(index) {
        return active(sizeOption === index, { defaultClass: 'option' })
    }
    function activeColor(index) {
        return active(colorOption === index, { defaultClass: 'option' })
    }
    function activePicture(index, obj = {}) {
        return active(pictureShow === index, obj)
    }
    function categoryPath() {
        let catPath = [];
        if (product.category) {
            catPath.unshift(product.category.name);
            if (product.category.parent_category) {
                catPath.unshift(product.category.parent_category.name);
                if (product.category.parent_category.parent_category) {
                    catPath.unshift(product.category.parent_category.parent_category.name);
                }
            }
        }
        return catPath.map((name, i) => {
            // => if that is last category
            if (catPath.length - 1 == i) {
                return (
                    <React.Fragment key={i}>
                        <Link href="/category">
                            {name}
                        </Link>
                    </React.Fragment>
                )
            }
            return (
                <React.Fragment key={i}>
                    <Link href="/category">
                        {name}
                    </Link>
                    &#x2192;
                </React.Fragment>
            )
        });
    }
    function options(optionName) {
        const { body } = product.options.filter(option => option.name === optionName)[0];
        return body ? JSON.parse(body) : [];
    }
    return (
        <section className="single-product">
            <div className="container">
                <div className="product">
                    <div className="path">
                        <Link href="/store">
                            <a className="store-logo">
                                <img src="/images/logo_1.jpg" />
                            </a>
                        </Link>
                        <div className="category-path">
                            {categoryPath()}
                        </div>
                    </div>
                    <div className="content">
                        <div className="pictures">
                            <div className="mini">
                                {pictures.map((p, i) => {
                                    const position = JSON.parse(p.position);
                                    const path = handlePath(p.path);
                                    return (
                                        <div key={i} className={activePicture(i, { defaultClass: 'picture' })} onClick={() => setPictureShow(i)}>
                                            <Image objectPosition={`${position.leftP}% ${position.topP}%`} layout="fill" src={path} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                            <div ref={show} onClick={showScroll} className="show">
                                {pictures.map((p, i) => {
                                    const position = JSON.parse(p.position);
                                    const path = handlePath(p.path);
                                    return (
                                        <div key={i} className={activePicture(i)}>
                                            <div className="image-wrapper"
                                                style={{
                                                    top: `${position.topP}%`,
                                                    height: `${position.heightP}%`
                                                }}
                                            >
                                                <Image
                                                    src={path}
                                                    alt=""
                                                    objectPosition={`${position.leftP}% ${position.topP}%`}
                                                    layout="fill"

                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="details">
                            <h2>Shop Name</h2>
                            <h3>{product.name}</h3>
                            <div className="price block">
                                <h4>Price</h4>
                                <div className="context">
                                    {product.offer_price ? <><del>{product.offer_price} LE</del><span> {product.price} LE</span></> : <span> {product.price} LE</span>}
                                </div>
                            </div>
                            <div className="block">
                                <h4>Choose from available sizes</h4>
                                <div className="context">
                                    {options('sizes_option').map((option, i) => <span key={i} onClick={() => setSizeOption(i)} className={activeSize(i)}>{option}</span>)}
                                </div>
                            </div>
                            <div className="block">
                                <h4>Choose from available Colors</h4>
                                <div className="context">
                                    {options('colors_option').map((option, i) => <span key={i} onClick={() => setColorOption(i)} className={activeColor(i)}>{option}</span>)}
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
    )
}
export default Product;