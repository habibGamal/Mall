import React, { useEffect, useState } from 'react'
import branch from '../../api/branch';
import BackendBranch from '../../BackendTypes/BackendBranch';
import Branch from '../../models/Branch';
import RowScroll from '../general/RowScroll'
import Store from './Store'

export default function Stores() {
    const [branches, setBranches] = useState([] as Array<Branch>);
    useEffect(() => {
        const getStores = async () => {
            const res = await branch.index();
            if (res.status === 200) {
                setBranches((res.data as Array<BackendBranch>).map(branch => new Branch(branch)));
            }
        }
        getStores()
    }, []);
    return (
        <section className="stores">
            <div className="container">
                <RowScroll>
                    {
                        branches.map(branch => <Store key={branch.id} src={branch.logo.path} href={`branch/${branch.id}`} name={branch.name} inside={false} />)
                    }
                </RowScroll>
            </div>
        </section>
    )
}
