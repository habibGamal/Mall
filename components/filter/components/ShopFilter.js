import React from 'react'
import CheckBox from '../../inputs/CheckBox'

export default function ShopFilter() {
    return (
        <div className="shop filter-option">
            <h4>Choose The Shop</h4>
            <div className="content">
                <CheckBox
                    label="Brave"
                    id="brave"
                    addClass=""
                />
                <CheckBox 
                    label="Town team"
                    id="town_team"
                    addClass=""
                />
            </div>
        </div>
    )
}
