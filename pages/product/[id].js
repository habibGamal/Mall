import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import active from '../../helpers/active'
import ProductControlPanel from '../../components/control-panel/ProductControlPanel'
import p from '../../api/product';
import NotEmpty from '../../directives/NotEmpty'
import cart from '../../api/cart'
import { $Async } from '../../redux/asyncActions'
import Picture from '../../models/Picture'
import { Messages, Popup } from '../../redux/dispatcher'
import { PopupLogin } from '../../redux/do'
import { MESSAGES } from '../../messages/messages'
import Product from '../../models/Product'
export const getServerSideProps = async (ctx) => {
    try {
        const res = await p.show(ctx.params.id);
        return {
            props: {
                product: res.data
            }
        }
    } catch (err) {
        const status = err?.response?.status;
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
export default function ShowProduct({ product }) {
    console.log(product);
    const show = useRef();
    const [sizeOption, setSizeOption] = useState(0);
    const [colorOption, setColorOption] = useState(0);
    const [pictureShow, setPictureShow] = useState(0);
    const [like, setLike] = useState(false);
    const pictures = Picture.getPictures(product);
    const productModel = new Product();
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
    async function addToCart() {
        try {
            const res = await $Async.AddCartItem({ product_id: product.id });
        } catch (error) {
            const { status = null, data = null } = error?.response;
            if (status === 401) {
                Messages.set('warning', MESSAGES.loginFirst);
            }
        }
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
                                {pictures.map(({ path, position }, i) => {
                                    return (
                                        <div key={i} className={activePicture(i, { defaultClass: 'picture' })} onClick={() => setPictureShow(i)}>
                                            <Image objectPosition={`${position.leftP}% ${position.topP}%`} layout="fill" src={path} alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                            <div ref={show} onClick={(e)=>productModel.showScroll(e,show)} className="show">
                                {pictures.map(({ path, position }, i) => {
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
                            <NotEmpty arr={options('sizes_option')}>
                                <div className="block">
                                    <h4>Choose from available sizes</h4>
                                    <div className="context">
                                        {options('sizes_option').map((option, i) => <span key={i} onClick={() => setSizeOption(i)} className={activeSize(i)}>{option}</span>)}
                                    </div>
                                </div>
                            </NotEmpty>
                            <NotEmpty arr={options('colors_option')}>
                                <div className="block">
                                    <h4>Choose from available Colors</h4>
                                    <div className="context">
                                        {options('colors_option').map((option, i) => <span key={i} onClick={() => setColorOption(i)} className={activeColor(i)}>{option}</span>)}
                                    </div>
                                </div>
                            </NotEmpty>
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
                                    <button onClick={addToCart} className="btn btn-success">Add to cart</button>
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