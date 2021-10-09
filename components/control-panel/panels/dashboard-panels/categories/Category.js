import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../../../../api/category';
import active from '../../../../../helpers/active';
import { deleteCategory } from '../../../../../redux/actions/apiFlow';
import { setPopup } from '../../../../../redux/actions/popup';
import { Messages } from '../../../../../redux/stateControllers/messages';
import Subcategories from './Subcategories';
function Category({ name, id, level, subCategories, buttonsT, setPopupEdit, setButtonsT, deleteCategory }) {
    const btns = useRef(null);
    const [expandCat,setExpandCat] = useState(false);
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
                Messages.set('danger', <>Category <strong>{name}</strong> has been deleted successfully</>);
                // => remove the category from categories state
                // console.log(deleteCategory);
                deleteCategory(id);
            }
        })
    }
    function editCat() {
        setPopupEdit(true, { id, name });
    }
    return (
        <div className={active(expandCat,{activeClass:'expand',defaultClass:'category'})} data-level={level}>
            <div className="category-content">
                <span onClick={()=>setExpandCat(!expandCat)} >
                    {subCategories.length === 0 ? <i className="fas fa-minus"></i>: <i className="fas fa-chevron-right"></i>}
                    {name}
                </span>
                <div id={`expand_${id}`} className="action">
                    <div onClick={toggle} className={active(buttonsT === `expand_${id}`, { defaultClass: 'expand' })}>
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                    <div ref={btns} className={active(buttonsT === `expand_${id}`, { defaultClass: 'buttons' })}>
                        <button onClick={editCat} className="btn btn-outline-success m-1">Edit</button>
                        <button onClick={deleteCat} className="btn btn-outline-danger m-1">Delete</button>
                        <button className="btn btn-outline-secondary m-1">Show</button>
                    </div>
                </div>
            </div>
            <Subcategories data={subCategories}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => (
    {
        setPopupEdit: (value, args) => dispatch(setPopup('edit-category', value, args)),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
    }
)
export default connect(null, mapDispatchToProps)(Category);
