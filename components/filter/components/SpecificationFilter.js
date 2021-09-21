import React from 'react'
import Input from '../../inputs/Input'
import Specification from './Specification'

export default function SpecificationFilter() {
    return (
        <div className="specificaitions filter-option">
            <h4>Filter by specifications</h4>
            <div className="content">
                <Specification 
                    name="Ram"
                    options={[
                        '8GB',
                        '6GB',
                        '4GB',
                        '3GB',
                        '2GB',
                        '1GB',
                    ]}
                />
            </div>
        </div>
    )
}
