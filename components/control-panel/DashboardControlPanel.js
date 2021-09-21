import React, { useRef, useState , useReducer } from 'react';
import Categories from './panels/dashboard-panels/categories/Categories';
import Branches from './panels/dashboard-panels/Branches';
import Products from './panels/dashboard-panels/Products'
import Workers from './panels/dashboard-panels/workers/Workers';
import Orders from './panels/dashboard-panels/Orders';
import active from '../../helpers/active';
import Navigation from '../general/navigation/Navigation';
import Filtering from '../filter/Filtering';
export default function Dashboard() {
    const taps = {
        'product' : <Products />,
        'branches' : <Branches />,
        'categories' : <Categories />,
        'workers' : <Workers />,
        'orders' : <Orders />
    }
    const [activeTap,setActiveTap] = useState('product');
    const page = useRef();
    return (
        <section className="dashboard">
            <div className="container">
                <div className="dashboard-content">
                    <div className="control-panel">
                        <Navigation 
                            activeTap = {activeTap}
                            setActiveTap = {setActiveTap}
                            taps = {[
                                {
                                    name:'product',
                                    content:(<><i className="fas fa-cubes" /> Products</>),
                                },
                                {
                                    name:'branches',
                                    content:(<><i className="fas fa-code-branch" /> Branches</>),
                                },
                                {
                                    name:'categories',
                                    content:(<><i className="fas fa-shopping-basket" /> Categories</>),
                                },
                                {
                                    name:'workers',
                                    content:(<><i className="fas fa-user-tie" /> Workers</>),
                                },
                                {
                                    name:'orders',
                                    content:(<><i className="fas fa-dolly" /> Orders</>),
                                },
                            ]}
                        />
                        {activeTap==='product' ? <Filtering />:''}
                    </div>
                    {taps[activeTap]}
                </div>
            </div>
        </section>

    )
}
