import React from 'react'
import Card from './Card'

export default function Cards() {
    return (
        <section className="info">
            <div className="container">
                <div className="row">
                    <Card 
                            className = "sales"
                            title="Total sales"
                            icon="fas fa-coins"
                            value={2000}
                            unit="EL"
                        />
                        <Card 
                            className = "views"
                            title="Total viwes"
                            icon="fas fa-users"
                            value={2000}
                            unit="view"
                        />
                        <Card 
                            className = "orders"
                            title="Total Orders"
                            icon="fas fa-dolly"
                            value={2000}
                            unit="orders"
                        />
                </div>
            </div>
        </section>
    )
}
