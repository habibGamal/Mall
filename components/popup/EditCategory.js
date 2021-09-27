import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../api/category';
import active from '../../helpers/active';
import invalid from '../../helpers/invalid';
import listCategories from '../../helpers/listCategories';
import { GetCategories } from '../../redux/actions/apiFlow';
import { attachForm, setInputValue, unAttachForm } from '../../redux/actions/form';
import { setPopup } from '../../redux/actions/popup';
import { SetMessage } from '../../redux/dispatchDirect';
import Input from '../inputs/Input';

function EditCategory({ show, keyPopup, attachForm, unAttachForm, categories, setInputValue, args, GetCategories, setPopup }) {
    const formKey = 'edit_cat';
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        attachForm(formKey);
        return () => {
            unAttachForm(formKey);
        }
    }, []);
    useEffect(() => {
        if (args !== undefined) {
            setInputValue('name', args.name.replace('→',''));
        }
    }, [args]);
    function editCat(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        form.append('_method', 'PUT');
        // => send category to backend
        category.edit(args.id, form)
            // => debug successful states
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // => get the new categories from backend
                    GetCategories();
                    // => remove popup
                    setPopup(false);
                    // => success message
                    SetMessage('success', <>Category <strong>{form.get('name')}</strong> has been added successfully</>);
                    // => clean Inputs
                    // emptyForm(formKey);
                    // => clean errors if exists
                    // setErrors(null);
                }
            })
        // => debug errors
        // .catch(err => {
        //     // => get error data,status code 
        //     const { data, status } = err.response;
        //     // => code 422 (invalid data)
        //     if (status === 422) {
        //         setErrors(data.errors);
        //     }
        // });

    }
    return (
        <div className={active(show(keyPopup), { defaultClass: 'popup edit-category' })}>
            <form onSubmit={editCat}>
                <Input
                    label="Category Name"
                    type="text"
                    addClass=""
                    name="name"
                    id="category_name"
                    invalidMsg={invalid('name', errors)}
                    formKey={formKey}
                />
                <Input
                    label="Parent Category"
                    type="select"
                    addClass=""
                    options={[{ value: 0, as: 'No parent' }, ...listCategories(categories)]}
                    name="parent_id"
                    id="category_parent"
                    formKey={formKey}
                />
                <button className="btn btn-success my-2">Save Changes</button>
            </form>
        </div>
    )
}


const mapStateToProps = state => ({
    show: (key) => state.popup[key],
    args: state.popup.args,
    categories: state.apiFlow.categories,
})

const mapDispatchToProps = dispatch => ({
    attachForm: fromKey => dispatch(attachForm(fromKey)),
    unAttachForm: fromKey => dispatch(unAttachForm(fromKey)),
    setInputValue: (inputName, inputValue) => dispatch(setInputValue('edit_cat', inputName, inputValue)),
    GetCategories: () => dispatch(GetCategories()),
    setPopup: (value) => dispatch(setPopup('edit-category', value))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
