import React from 'react'
import SingleCategory from '../components/categories/Category'
import MiniShowStore from '../components/stores/MiniShowStore'

export default function Category() {
    return (
        <section className="single-category">
            <SingleCategory 
                name="Home"
                src="./images/cat_4.jpg"
                inside={true}
            />
            <div className="container">
                <MiniShowStore 
                    src="./images/logo_1.jpg"
                    href="/Town"
                    name="Town"
                />
                <MiniShowStore 
                    src="./images/logo_2.jpg"
                    href="/Town"
                    name="Brave"
                />
            </div>
        </section>
    )
}
