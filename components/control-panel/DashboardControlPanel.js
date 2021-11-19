import React, { useRef, useState, useReducer, useEffect } from 'react';
import Categories from './panels/dashboard-panels/categories/Categories';
import Branches from './panels/dashboard-panels/Branches';
import Products from './panels/dashboard-panels/Products'
import Workers from './panels/dashboard-panels/workers/Workers';
import Orders from './panels/dashboard-panels/Orders';
import Navigation from '../general/navigation/Navigation';
import Filtering from '../filter/Filtering';
import { useRouter } from 'next/router';
export default function Dashboard() {
    // => make the taps accessable by url query
    const router = useRouter();
    const [activeTap, setActiveTap] = useState(router.query.tap);
    const resetTap = () => {
        router.push({ query: { ...router.query, tap: 'product' } }, null, { scroll: false });
        setActiveTap('product');
    }
    useEffect(() => {
        if (router.query.tap) {
            if (!taps[router.query.tap]) {
                // => in case of wrong query reset it to product
                resetTap();
                return;
            }
            router.push({ query: { ...router.query, tap: activeTap } }, null, { scroll: false });
            return;
        } else {
            // => in case of no tap query in url
            resetTap();
        }
    }, [activeTap])
    const taps = {
        'product': <Products />,
        'branches': <Branches />,
        'categories': <Categories />,
        'workers': <Workers />,
        'orders': <Orders />
    }
    return (
        <section className="dashboard">
            <div className="container">
                <div className="dashboard-content">
                    <div className="control-panel">
                        <Navigation
                            activeTap={activeTap}
                            setActiveTap={setActiveTap}
                            taps={[
                                {
                                    name: 'product',
                                    content: (<><i className="fas fa-cubes" /> Products</>),
                                },
                                {
                                    name: 'branches',
                                    content: (<><i className="fas fa-code-branch" /> Branches</>),
                                },
                                {
                                    name: 'categories',
                                    content: (<><i className="fas fa-shopping-basket" /> Categories</>),
                                },
                                {
                                    name: 'workers',
                                    content: (<><i className="fas fa-user-tie" /> Workers</>),
                                },
                                {
                                    name: 'orders',
                                    content: (<><i className="fas fa-dolly" /> Orders</>),
                                },
                            ]}
                        />
                        {activeTap === 'product' ? <Filtering /> : ''}
                    </div>
                    {taps[activeTap]}
                </div>
            </div>
        </section>

    )
}
