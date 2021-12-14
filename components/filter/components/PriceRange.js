import React from 'react'
import Number from '../../inputs/Number'

export default function PriceRange() {
    return (
        <div className="price-range filter-option">
            <h4>Price Range</h4>
            <div className="content">
                <Number
                    label={null}
                    type="number"
                    addClass=""
                />
                <span>To</span>
                <Number 
                    label={null}
                    addClass=""
                />
            </div>
        </div>
    )
}
