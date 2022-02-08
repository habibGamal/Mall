import React, { useReducer, useRef, useState } from 'react'
import active from '../../helpers/active'
import Sort from './Sort'
import Filter from './Filter'
import Search from './Search'
import Link from 'next/link'
import Category from './components/Category'
import CategoryFilter from './components/CategoryFilter'
import PriceRange from './components/PriceRange'
import ShopFilter from './components/ShopFilter'
import Options from './components/Options'
import SpecificationFilter from './components/SpecificationFilter'

// note: T stand for Toggle (like: searchT=>searchToggle)
export default function Filtering({ requirements }:{requirements?:Array<string>}) {
    const [filterT, setFilterT] = useState(false);
    if (requirements === undefined) {
        requirements = [
            'sort', 'filter', 'search'
        ];
    }
    function requirement(name, key) {
        switch (name) {
            case 'sort':
                return <Sort key={key} />
            case 'filter':
                return <Filter key={key} setFilterT={setFilterT} />
            case 'search':
                return <Search key={key} />
        }
    }
    return (
        <>
            <div onClick={() => setFilterT(false)} className={active(filterT, { defaultClass: 'escape-effect' })} />
            <ul className="filters">
                {requirements.map((r, i) => requirement(r, i))}
            </ul>
            <div className={active(filterT, { defaultClass: 'filter' })}>
                <h3 className="text-center">Filter</h3>
                <div className="grid">
                    <div className="group">
                        <CategoryFilter />
                        <ShopFilter />
                        <PriceRange />
                        <Options />
                    </div>
                    <div className="group">
                        <SpecificationFilter />
                    </div>
                </div>
            </div>
        </>
    )
}
