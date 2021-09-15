import React from 'react'
import Filtering from '../components/filter/Filtering'
import SingleStore from '../components/stores/Store'
import Products from '../components/products/Products'
export default function Store() {
    return (
        <section className="single-store">
            <div className="background-store">
                <img src="./images/background-store-1.jpg" />
            </div>
            <div className="container info-control-container">
                <div className="info-control">
                    <SingleStore
                        src="./images/logo_1.jpg"
                        name="Town"
                        inside={true}
                    />
                    <div className="control-panel">
                        <Filtering
                            requirements={['sort', 'filter', 'search']}
                        />
                    </div>
                </div>
            </div>
            <Products 
                title="Latest Products"
            />
            <Products 
                title="Top Sales"
            />
            <Products 
                title="Men"
            />
            <Products 
                title="Women Fashion"
            />
        </section>
    )
}
