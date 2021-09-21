import React from 'react'
import Input from '../../inputs/Input'

export default function ShopFilter() {
    return (
        <div className="shop filter-option">
            <h4>Choose The Shop</h4>
            <div className="content">
                <Input 
                    label="Brave"
                    id="brave"
                    type="check"
                    addClass=""
                />
                <Input 
                    label="Town team"
                    id="town_team"
                    type="check"
                    addClass=""
                />
            </div>
        </div>
    )
}
