import React from 'react'
import Category from './Category'

export default function Categories() {
    return (
        <section className="categories">
        <div className="container">
            <div className="grid">
                <Category 
                    name="Casual"
                    src="./images/cat_6.jpg"
                    href="/casual"
                />
                <a href=""  className="category">
                    <div className="photo">
                        <img src="./images/cat_1.jpg" />
                    </div>
                    <div className="lable">
                        <h4>Men</h4>
                    </div>
                </a>
                <a href=""  className="category">
                    <div className="photo">
                        <img src="./images/cat_2.jpg" />
                    </div>
                    <div className="lable">
                        <h4>Formal</h4>
                    </div>
                </a>
                <a href=""  className="category">
                    <div className="photo">
                        <img src="./images/cat_4.jpg" />
                    </div>
                    <div className="lable">
                        <h4>Home</h4>
                    </div>
                </a>
                <a href=""  className="category">
                    <div className="photo">
                        <img src="./images/cat_5.jpg" />
                    </div>
                    <div className="lable">
                        <h4>Fashion</h4>
                    </div>
                </a>
                <a href=""  className="category">
                    <div className="photo">
                        <img src="./images/cat_3.jpg" />
                    </div>
                    <div className="lable">
                        <h4>Classic</h4>
                    </div>
                </a>
            </div>
        </div>
    </section>
    )
}
