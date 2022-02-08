import React, { useRef, useState } from 'react'
import active from '../../helpers/active';
import t from '../../helpers/translate';

export default function Search() {
    const [searchT,setSearchT] = useState(false);
    const search = useRef<HTMLInputElement>();
    return (
        <li id="search">
            <span onClick={async () => {
                await setSearchT(true);
                search.current.focus();
            }}>
                <i className="fas fa-search" /> {t('Search','بحث')}
            </span>
            <form className={active(searchT)}>
                <div className="form-group">
                    <input autoFocus ref={search} onBlur={() => setSearchT(false)} type="text" className="form-control" name="dashboard-search" id="exampleInputEmail1" placeholder={t('Search','بحث')} />
                </div>
            </form>
        </li>
    )
}
