import React from 'react'
import Category from './Category'

export default function SubCategory({formKey,subCategories,parentId}) {
    return (
        <div className="children">
            {subCategories.map(c => <Category key={c.id} id={c.id} name={c.name} formKey={formKey} parentId={parentId} subCategories={c.sub_categories} />)}
        </div>
    )
}
