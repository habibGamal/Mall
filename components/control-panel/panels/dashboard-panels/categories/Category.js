import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../../../api/category';
import active from '../../../../../helpers/active';
import { SetMessage } from '../../../../../redux/dispatchDirect';
import { GetCategories, deleteCategory } from '../../../../../redux/actions/apiFlow';
import { setPopup } from '../../../../../redux/actions/popup';
import { setInputValue } from '../../../../../redux/actions/form';
function Category({ name, count, id, buttonsT, setPopupEdit, setButtonsT, deleteCategory }) {
    const btns = useRef(null)
    function toggle() {
        if (buttonsT !== `expand_${id}`) {
            setButtonsT(`expand_${id}`);
        } else {
            setButtonsT('');
        }
    }
    function deleteCat() {
        category.deleteCategory(id).then(res => {
            if (res.status === 200 && res.data == 1) {
                // => success message
                SetMessage('danger', <>Category <strong>{name}</strong> has been deleted successfully</>);
                // => remove the category from categories state
                deleteCategory(id);
            }
        })
    }
    function editCat() {
        setPopupEdit(true,{id,name});
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
                    <button onClick={editCat} className="btn btn-outline-success m-1">Edit</button>
                    <button onClick={deleteCat} className="btn btn-outline-danger m-1">Delete</button>
                    <button className="btn btn-outline-secondary m-1">Show</button>
                </div>
            </td>
        </tr>
    )
}

const mapDispatchToProps = dispatch => (
    {
        setPopupEdit: (value, args) => dispatch(setPopup('edit-category', value, args)),
        GetCategories: () => dispatch(GetCategories()),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
    }
)
export default connect(null, mapDispatchToProps)(Category);
