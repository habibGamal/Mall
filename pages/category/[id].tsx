import React, { useMemo } from 'react'
import category from '../../api/category';
import { BackendFullCategory } from '../../BackendTypes/BackendFullCategory';
import SingleCategory from '../../components/categories/CategorySinglePage'
import Empty from '../../components/general/Empty';
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
    } catch (e) {
        return {
            notFound: {}
        }
    }

}
export default function Category({ category }: { category: BackendFullCategory }) {
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
                        <Empty msg="This category doesn't have any products yet" />
                        : categoryModel.branches.map(
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
