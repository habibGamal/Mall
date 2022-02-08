import React, { useMemo } from 'react'
import category from '../../api/category';
import BackendProduct from '../../BackendTypes/BackendProduct';
import SingleCategory from '../../components/categories/CategorySinglePage'
import Empty from '../../components/general/Empty';
import Products from '../../components/products/Products';
import MiniShowStore from '../../components/stores/MiniShowStore'
import FullCategory from '../../models/FullCategory';

export const getServerSideProps = async (ctx) => {
    try {
        const res = await category.show(ctx.params.id);
        if (res.status === 200) {
            return {
                props: {
                    category: res.data,
                }
            }
        }
    }catch(e){
        return {
            notFound:{}
        }
    }
    
}
type BackendSinglePageCategory = {
    created_at: string,
    id: number,
    level: number,
    name: string,
    parent_id: number,
    products: Array<{
        branches: Array<{
            id: number,
            logo: string,
            name: string,
        }>,
        category_id: number,
        id: number,
        name: string,
        offer_price: number,
        pictures: string,
        price: number
    }>
}
export default function Category({ category }) {
    const categoryModel = useMemo(() => new FullCategory(category), [category]);
    return (
        <section className="single-category">
            <SingleCategory
                name={categoryModel.name}
                src="../images/cat_4.jpg"
            />
            <div className="container">
                {
                    categoryModel.branches.length == 0 ?
                    <Empty msg="This category doesn't have any products yet"/>
                    :categoryModel.branches.map(
                        branch => <MiniShowStore
                            key={branch.id}
                            branch={branch}
                        />
                    )
                }
            </div>
        </section>
    )
}
