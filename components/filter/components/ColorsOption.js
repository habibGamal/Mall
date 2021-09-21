import React from 'react'
import Input from '../../inputs/Input'

export default function ColorsOption() {
    return (
        <div className="option">
            <h5>Colors</h5>
            <div className="colors">
                <Input
                    label="Red"
                    id="red"
                    type="check"
                    addClass=""
                />
                <Input
                    label="Blue"
                    id="blue"
                    type="check"
                    addClass=""
                />
                <Input
                    label="Orange"
                    id="orange"
                    type="check"
                    addClass=""
                />
            </div>
        </div>
    )
}
