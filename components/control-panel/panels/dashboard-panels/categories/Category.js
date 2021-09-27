import React, { useRef, useState } from 'react'
import category from '../../../../../api/category';
import active from '../../../../../helpers/active';
import { SetMessage } from '../../../../../redux/dispatchDirect';

export default function Category({ name, count, id, buttonsT, setButtonsT }) {
    const btns = useRef(null)
    function toggle() {
        if(buttonsT !== `expand_${id}`){
            setButtonsT(`expand_${id}`);
        }else{
            setButtonsT('');
        }
    }
    function deleteCategory(){
        category.deleteCategory(id).then(res=>{
            console.log(res);
            if(res.status === 200){
                // => success message
                SetMessage('danger',<>Category <strong>{name}</strong> has been deleted successfully</>);
            }
        })
    }
    return (
        <tr>
            <td>{name}</td>
            <td>{count}</td>
            <td id={`expand_${id}`} className="action">
                <div onClick={toggle} className={active(buttonsT === `expand_${id}`, { defaultClass: 'expand' })}>
                    <i className="fas fa-ellipsis-v"></i>
                </div>
                <div ref={btns} className={active(buttonsT === `expand_${id}`, { defaultClass: 'buttons' })}>
                    <button className="btn btn-outline-success m-1">Edit</button>
                    <button onClick={deleteCategory} className="btn btn-outline-danger m-1">Delete</button>
                    <button className="btn btn-outline-secondary m-1">Show</button>
                </div>
            </td>
        </tr>
    )
}
