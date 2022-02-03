import React from 'react'
import Store from './Store'
import ProductsMiniShowStore from './ProductsMiniShowStore'
import { BranchHasProducts } from '../../types/BranchHasProducts'
export default function MiniShowStore({branch}:{branch:BranchHasProducts}) {
    return (
        <div className="mini-show-store">
            <Store
                src={branch.logo.path}
                href={`/branch/${branch.id}`}
                name={branch.name}
                inside={false}
            />
            <ProductsMiniShowStore
                products={branch.products}
            />
        </div>
    )
}
