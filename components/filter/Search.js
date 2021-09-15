import React, { useRef, useState } from 'react'
import active from '../../helpers/active';

export default function Search() {
    const [searchT,setSearchT] = useState(false);
    const search = useRef();
    return (
        <li id="search">
            <span onClick={async () => {
                await setSearchT(true);
                search.current.focus();
            }}>
                <i className="fas fa-search" /> Search
            </span>
            <form className={active(searchT)}>
                <div className="form-group">
                    <input autoFocus ref={search} onBlur={() => setSearchT(false)} type="text" className="form-control" name="dashboard-search" id="exampleInputEmail1" placeholder="Search" />
                </div>
            </form>
        </li>
    )
}
