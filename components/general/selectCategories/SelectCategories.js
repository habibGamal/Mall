import React, { useEffect, useState } from 'react'
import category from '../../../api/category';
import Loading from '../../../directives/Loading';
import Category from './Category';
export default function SelectCategories({formKey}) {
    const [categories,setCategories] = useState(null);
    useEffect(()=>{
        category.index().then(res=>setCategories(res.data));
    },[]);
    if(!categories){
        return <Loading />
    }
    return (
        <>
            {categories.map(c=><Category key={c.id} id={c.id} name={c.name} formKey={formKey} subCategories={c.sub_categories} />) }
        </>

    )
}
