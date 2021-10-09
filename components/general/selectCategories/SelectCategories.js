import React, { useEffect, useState } from 'react'
import Input from '../../inputs/Input'
import category from '../../../api/category';
import Loading from '../../../directives/Loading';
import Category from './Category';
import { connect } from 'react-redux';
export default function SelectCategories({formKey}) {
    const [categories,setCategories] = useState(null);
    useEffect(()=>{
        category.index().then(res=>setCategories(res.data));
    },[]);
    if(!categories){
        return <Loading />
    }
    return (
        <fieldset form={formKey} name="category">
            {categories.map(c=><Category key={c.id} id={c.id} name={c.name} parentId={null} formKey={formKey} subCategories={c.sub_categories} />) }
        </fieldset>

    )
}
