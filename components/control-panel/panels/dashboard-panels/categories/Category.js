import React, { useState } from 'react'
import active from '../../../../../helpers/active';

export default function Category({ name, count, deg }) {
    const [buttonsT,setButtonsT] = useState(false);
    return (
        <tr>
            <td>{name}</td>
            <td>{count}</td>
            <td className="action">
                <div onClick={()=>setButtonsT(!buttonsT)} className="expand">
                    <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className={active(buttonsT,{defaultClass:'buttons'})}>
                    <button className="btn btn-outline-success m-1">Edit</button>
                    <button className="btn btn-outline-danger m-1">Delete</button>
                    <button className="btn btn-outline-secondary m-1">Show</button>
                </div>
            </td>
        </tr>
    )
}
