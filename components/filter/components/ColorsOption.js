import React from 'react'
import CheckBox from '../../inputs/CheckBox'

export default function ColorsOption() {
    return (
        <div className="option">
            <h5>Colors</h5>
            <div className="colors">
                <CheckBox
                    label="Red"
                    id="red"
                    addClass=""
                />
                <CheckBox
                    label="Blue"
                    id="blue"
                    addClass=""
                />
                <CheckBox
                    label="Orange"
                    id="orange"
                    addClass=""
                />
            </div>
        </div>
    )
}
