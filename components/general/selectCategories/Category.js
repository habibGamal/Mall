import React from 'react'
import SubCategory from './SubCategory';
import CheckBox from '../../inputs/CheckBox';

export default function Category({ id, name, formKey, subCategories }) {
    return (
        <div className="category">
            <CheckBox
                label={name}
                name='category'
                id={id}
                addClass=""
                formKey={formKey}
                value={id}
            />
            <SubCategory formKey={formKey} subCategories={subCategories} />
        </div>
    )
}
