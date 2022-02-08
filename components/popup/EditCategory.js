import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import category from '../../api/category';
import active from '../../helpers/active';
import invalid from '../../helpers/invalid';
import listCategories from '../../helpers/listCategories';
import { $Async } from '../../redux/async_actions';
import { Messages, Forms, Popup } from '../../redux/dispatcher';
import Select from '../inputs/Select';
import Text from '../inputs/Text';

function EditCategory({ show, keyPopup, categories, setInputValue, args, setPopup }) {
    const formKey = 'edit_cat';
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        Forms.attachForm(formKey);
        return () => {
            Forms.unattachForm(formKey);
        }
    }, []);
    useEffect(() => {
        if (args !== undefined) {
            setInputValue('name', args.name.replace('→', ''));
        }
        setErrors(null);
    }, [args]);
    function editCat(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        form.append('_method', 'PUT');
        // => send category to backend
        category.edit(args.id, form)
            // => debug successful states
            .then(res => {
                if (res.status === 200) {
                    // => get the new categories from backend
                    $Async.GetCategories();
                    // => remove popup
                    setPopup(false);
                    // => success message
                    Messages.set('success', <>Category <strong>{form.get('name')}</strong> has been added successfully</>);
                    // => clean errors if exists
                    setErrors(null);
                }
            })
            // => debug errors
            .catch(err => {
                // => get error data,status code 
                if(err.response){
                    const { data, status } = err.response;
                    // => code 422 (invalid data)
                    if (status === 422) {
                        setErrors(data.errors);
                    }
                }else {
                    console.log(err);
                }

            });

    }
    return (
        <div className={active(show(keyPopup), { defaultClass: 'popup edit-category' })}>
            <form onSubmit={editCat}>
                <Text
                    label="Category Name"
                    addClass=""
                    name="name"
                    id="category_name"
                    invalidMsg={invalid('name', errors)}
                    formKey={formKey}
                />
                <Select
                    label="Parent Category"
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
    categories: state.apiData.categories,
})

const mapDispatchToProps = dispatch => ({
    setInputValue: (inputName, inputValue)=>Forms.setInputValue('edit_cat', inputName, inputValue),
    setPopup: (value) => Popup.setPopup('edit-category', value),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);
