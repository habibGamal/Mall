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
                    href="/category"
                />
                <Category 
                    name="Men"
                    src="./images/cat_1.jpg"
                    href="/category"
                />
                <Category 
                    name="Formal"
                    src="./images/cat_2.jpg"
                    href="/category"
                />
                <Category 
                    name="Home"
                    src="./images/cat_4.jpg"
                    href="/category"
                />
                <Category 
                    name="Classic"
                    src="./images/cat_3.jpg"
                    href="/category"
                />
                <Category 
                    name="Fashion"
                    src="./images/cat_5.jpg"
                    href="/category"
                />
            </div>
        </div>
    </section>
    )
}
