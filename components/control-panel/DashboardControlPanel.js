import React, { useRef, useState , useReducer } from 'react';
import Categories from './panels/dashboard-panels/Categories';
import Branches from './panels/dashboard-panels/Branches';
import Products from './panels/dashboard-panels/Products'
import Workers from './panels/dashboard-panels/workers/Workers';
import Orders from './panels/dashboard-panels/Orders';
import active from '../../helpers/active';
import Navigation from '../general/navigation/Navigation';
// note: T stand for Toggle (like: searchT=>searchToggle)
function reducer(state,{type,payload}){
    switch(type){
        case 'searchT':
            return {
                ...state,
                searchT:payload
            }
        case 'filterT':
            return {
                ...state,
                filterT:payload
            }  
        default : return state
    }
}
export default function Dashboard() {
    const initialState = {
        searchT:false,
        filterT:false,
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const taps = {
        'product' : <Products />,
        'branches' : <Branches />,
        'categories' : <Categories />,
        'workers' : <Workers />,
        'orders' : <Orders />
    }
    const [activeTap,setActiveTap] = useState('product');
    const page = useRef();
    const search = useRef();
    function activeClass(panel){
        return active(state.activePanel===panel);
    }
    return (
        <section className="dashboard">
            <div className="container">
                <div className="dashboard-content">
                    <div onClick={()=>dispatch({type:'filterT',payload:false})} className={active(state.filterT,{defaultClass:'escape-effect'})} />
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
                        <ul className="filters">
                            <li className="dropdown">
                                <span id="sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-sort" /> Sort
                                </span>
                                <div className="dropdown-menu" aria-labelledby="sort">
                                    <a className="dropdown-item" href="#">High price to low</a>
                                    <a className="dropdown-item" href="#">Low price to high</a>
                                    <a className="dropdown-item" href="#">New to old</a>
                                </div>
                            </li>
                            <li id="filter">
                                <span onClick={()=>dispatch({type:'filterT',payload:true})}>
                                    <i className="fas fa-filter" /> Filter
                                </span>
                                <div className={active(state.filterT,{defaultClass:'filter'})}>
                                    <h3 className="text-center">Filter</h3>
                                </div>
                            </li>
                            <li id="search">
                                <span onClick={async()=>{
                                    await dispatch({type:'searchT',payload:true});
                                    search.current.focus();
                                }}>
                                    <i className="fas fa-search" /> Search
                                </span>
                                <form className={active(state.searchT)}>
                                    <div className="form-group">
                                        <input autoFocus ref={search} onBlur={()=>dispatch({type:'searchT',payload:false})} type="text" className="form-control" name="dashboard-search" id="exampleInputEmail1" placeholder="Search" />
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                    {taps[activeTap]}
                </div>
            </div>
        </section>

    )
}
