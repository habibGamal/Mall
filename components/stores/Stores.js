import React from 'react'
import Store from './Store'

export default function stores() {
    return (
        <section className="stores">
            <div className="container">
                <div className="row">
                    <Store 
                        src="./images/logo_1.jpg"
                        href="/Town"
                        name="Town"
                    />
                    <Store 
                        src="./images/logo_2.jpg"
                        href="/patrol"
                        name="patrol"
                    />
                    <Store 
                        src="./images/logo_3.jpg"
                        href="/Brave"
                        name="Brave"
                    />
                    <Store 
                        src="./images/logo_1.jpg"
                        href="/Firewood"
                        name="Firewood"
                    />
                </div>
            </div>
        </section>
    )
}
