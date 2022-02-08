import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import branch from '../../../../api/branch';
import Branch from '../../../../models/Branch';
import BackendBranch from '../../../../BackendTypes/BackendBranch';
import Loading from '../../../../directives/Loading';
export default function Branches() {
    const [branches, setBranches] = useState([]);
    const [loadingBranches, setLoading] = useState(false);
    useEffect(() => {
        const getBranches = async () => {
            const res = await branch.indexForOwner();
            if (res.status === 200) {
                setBranches(res.data.map((branch: BackendBranch) => new Branch(branch)));
                setLoading(true);
            }
        }
        getBranches()
    }, []);
    return (
        <>
            <div className="controllers mt-3">
                <button className="btn btn-add mx-auto"><i className="fas fa-plus-circle" /> Add Branch</button>
            </div>
            <Loading state={loadingBranches} mini={true}>
                <table className="dashboard-table">
                    <tbody>
                        {
                            branches.map(
                                branch => <SingleBranch key={branch.id} branch={branch} />
                            )
                        }
                    </tbody>
                </table>
            </Loading>
        </>
    )
}
function SingleBranch({ branch }: { branch: Branch }) {
    return (
        <tr>
            <td className="logo">
                <img src={branch.logo.path} />
            </td>
            <td><Link href={`/branch/${branch.id}`}>{branch.name}</Link></td>
            <td className="buttons">
                <button className="btn btn-outline-success">Edit</button>
                <button className="btn btn-outline-danger">Delete</button>
            </td>
        </tr>
    )
}