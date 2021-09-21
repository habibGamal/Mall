import React from 'react'
import Input from '../../../../inputs/Input'
import Category from './Category'

export default function Categories() {
    return (
        <div className="categories">
            <div className="add-category">
                <h4>Add New Category</h4>
                <Input
                    label="Category Name"
                    type="text"
                    addClass=""
                />
                <Input
                    label="Parent Category"
                    type="select"
                    addClass=""
                    options={[
                        'main'
                    ]}
                />
            </div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Count</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <Category 
                        name="Phones"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;Samsong"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;Apple"
                        count="52"
                    />
                    <Category 
                        name="Electronics"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;TV's"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;&#x2015;Toshiba"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;&#x2015;Samsong"
                        count="52"
                    />
                    <Category 
                        name="&#x2015;&#x2015;Lg"
                        count="52"
                    />
                </tbody>
            </table>

        </div>
    )
}
