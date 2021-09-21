import React from 'react'
import Input from '../../inputs/Input'

export default function PriceRange() {
    return (
        <div className="price-range filter-option">
            <h4>Price Range</h4>
            <div className="content">
                <Input 
                    label={null}
                    type="number"
                    addClass=""
                />
                <span>To</span>
                <Input 
                    label={null}
                    type="number"
                    addClass=""
                />
            </div>
        </div>
    )
}
