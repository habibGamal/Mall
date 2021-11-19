import React from 'react'
import Link from 'next/link'
export default function Branches() {
    return (
        <>
            <div className="controllers mt-3">
                <button className="btn btn-add mx-auto"><i className="fas fa-plus-circle" /> Add Branch</button>
            </div>
            <table className="dashboard-table">
                <tbody>
                    <tr>
                        <td className="logo">
                            <img src="./images/logo_1.jpg" />
                        </td>
                        <td><Link href="/branches/1">فرع الجمهورية</Link></td>
                        <td className="buttons">
                            <button className="btn btn-outline-success">Edit</button>
                            <button className="btn btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="logo"><img src="./images/logo_1.jpg" /></td>
                        <td><Link href="/branches/1">فرع النميس</Link></td>
                        <td className="buttons">
                            <button className="btn btn-outline-success">Edit</button>
                            <button className="btn btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="logo"><img src="./images/logo_1.jpg" /></td>
                        <td><Link href="/branches/1">فرع الجمهورية</Link></td>
                        <td className="buttons">
                            <button className="btn btn-outline-success">Edit</button>
                            <button className="btn btn-outline-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
