import React from 'react'
import invalid from '../../helpers/invalid'
import File from '../inputs/File'
import Text from '../inputs/Text'

export default function BranchForm({ index, full, formKey, errors }) {
    if (!full) {
        return (
            <div className="groups branch">
                <h3>Branch ({index})</h3>
                <div className="form-row">
                    <Text
                        label="Shortcut name for the branch"
                        name={`short_branch_name-${index}`}
                        id={`short_branch_name-${index}`}
                        placeholder="مثال : فرع النميس"
                        icon={<i className="fas fa-store"></i>}
                        invalidMsg={invalid('short_branch_name-'+index, errors)}
                        formKey={formKey}
                    />
                    <Text
                        label="Address"
                        name={`address-${index}`}
                        id={`address-${index}`}
                        icon={<i className="fas fa-map-marker-alt"></i>}
                        invalidMsg={invalid('address-'+index, errors)}
                        formKey={formKey}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productName">Gps Location</label>
                    <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                </div>
            </div>
        )
    }
    return (
        <div className="groups branch">
            <h3>Branch ({index})</h3>
            <div className="form-row">
                <Text
                    label="Shop Name"
                    name={`branch_name-${index}`}
                    id={`branch_name-${index}`}
                    icon={<i className="fas fa-store"></i>}
                    invalidMsg={invalid('branch_name-'+index, errors)}
                    formKey={formKey}
                />
                <Text
                    label="Address"
                    name={`address-${index}`}
                    id={`address-${index}`}
                    icon={<i className="fas fa-map-marker-alt"></i>}
                    invalidMsg={invalid('address-'+index, errors)}
                    formKey={formKey}
                />
            </div>
            <div className="form-row">
                <File
                    label="Store Logo"
                    onChange={() => { }}
                    name={`logo-${index}`}
                    id={`logo-${index}`}
                    invalidMsg={invalid('logo-'+index, errors)}
                    formKey={formKey}
                />
                <div className="form-group">
                    <label htmlFor="productName">Gps Location</label>
                    <input type="button" className="form-control btn btn-primary" defaultValue="Locate" />
                </div>
            </div>
        </div>
    )
}
