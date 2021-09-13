import React from 'react'

export default function Worker() {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="worker">
                <div className="name">
                    <i className="fas fa-user"></i>
                    <h4>M.Maged</h4>
                </div>
                <div className="branches">
                    <h5>Branches</h5>
                    <ul>
                        <li>فرع النميس</li>
                        <li>فرع فريال</li>
                    </ul>
                </div>
                <div className="permissions">
                    <h5>Permissions</h5>
                    <ul>
                        <li data-permission="add">Add</li>
                        <li data-permission="edit">Edit</li>
                        <li data-permission="delete">Delete</li>
                    </ul>
                </div>
                <div className="controllers">
                    <button className="btn btn-success">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}
